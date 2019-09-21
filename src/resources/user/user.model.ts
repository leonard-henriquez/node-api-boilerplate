import { model, Schema, Document } from 'mongoose'
import { hashPassword, verifyHash } from '../../helpers/encrypt'

export interface UserDocument extends Document {
  firstName: string
  lastName: string
  email: string
  hashedPassword: string
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

UserSchema.pre('save', function(this: UserDocument, next) {
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

export default model('User', UserSchema)
