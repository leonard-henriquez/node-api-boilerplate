const passport = require('passport')
const { Router } = require('express')

const {
  get,
  login,
  logout,
} = require('./auth.controller')

const router = Router()

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), get)
  .post(login)
  .delete(logout)

module.exports = router
