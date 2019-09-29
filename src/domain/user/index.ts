import { model, Schema, Document } from 'mongoose'
import { hashPassword, verifyHash } from '@infrastructure/crypto'

interface UserModelInterface extends Express.User, Document {
  verifyPassword(password: string): Promise<boolean>
}

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

UserSchema.methods.verifyPassword = async function(password: string): Promise<boolean> {
  return verifyHash(password, this.hashedPassword)
}

export default model<UserModelInterface>('User', UserSchema)
