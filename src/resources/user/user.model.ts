import { model, Schema } from 'mongoose'
import { hashPassword, verifyHash } from '../../helpers/encrypt'
import { UserModelInterface } from 'user'

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    index: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
})

UserSchema.virtual('password').set(function(this: { hashedPassword: string }, password: string) {
  this.hashedPassword = password
})

UserSchema.pre('save', function(this: UserModelInterface, next) {
  // Skip if password has not changed
  if (!this.isModified('hashedPassword')) return next()

  // Hash the password
  const password = this.hashedPassword
  this.hashedPassword = hashPassword(password)
  next()
})

UserSchema.methods.verifyHash = async function(password: string): Promise<boolean> {
  return verifyHash(password, this.hashedPassword)
}

export default model<UserModelInterface>('User', UserSchema)
