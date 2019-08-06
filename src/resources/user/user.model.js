const mongoose = require('mongoose')
const { hashPassword, verifyHash } = require('../../helpers/encrypt')

const { Schema } = mongoose

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

UserSchema
  .virtual('password')
  .set(function (password) {
    this.hashedPassword = password
  })

UserSchema.pre('save', function (next) {
  const user = this

  // Skip if password has not changed
  if (!user.isModified('hashedPassword')) return next()

  // Hash the password
  const password = user.hashedPassword
  user.hashedPassword = null
  user.hashedPassword = hashPassword(password)
  next()
})

UserSchema.methods.verifyHash = async function (password) {
  return verifyHash(password, this.hashedPassword)
}

const User = mongoose.model('User', UserSchema)

module.exports = User
