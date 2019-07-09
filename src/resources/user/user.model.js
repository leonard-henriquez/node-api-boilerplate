const mongoose = require('mongoose')
const { hashPassword, verifyHash } = require('../../helpers/encryption')

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
  hashed_password: {
    type: String,
    required: true,
  },
})

UserSchema
  .virtual('password')
  .set(function setPassword(password) {
    this.hashed_password = password
  })

UserSchema.pre('save', function (next) {
  const user = this

  // Skip if password has not changed
  if (!user.isModified('hashed_password')) return next()

  // Hash the password
  const password = user.hashed_password
  user.hashed_password = null
  user.hashed_password = hashPassword(password)
  next()
})

UserSchema.methods.comparePassword = password => verifyHash(password, this.hashed_password)

const User = mongoose.model('User', UserSchema)

module.exports = User
