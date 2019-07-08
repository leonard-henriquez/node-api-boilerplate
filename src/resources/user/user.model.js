const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

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
  bcrypt.hash(user.hashed_password, 10)
    .then((hash) => {
      // Save hashed password
      user.hashed_password = hash
      next()
    })
    .catch(err => next(err))
})

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.hashed_password)
}

const User = mongoose.model('User', UserSchema)

module.exports = User
