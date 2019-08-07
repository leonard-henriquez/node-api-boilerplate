const passport = require('passport')
const { Router } = require('express')

const {
  get,
  login,
} = require('./auth.controller')

const router = Router()

const auth = passport.authenticate('jwt', { session: false, failWithError: true })

router.route('/')
  .get(auth, get)
  .post(login)

module.exports = router
