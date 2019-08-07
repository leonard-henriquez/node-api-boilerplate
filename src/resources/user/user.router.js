const { Router } = require('express')
const passport = require('passport')

const {
  list,
  create,
  get,
  update,
  remove,
} = require('./user.controller')

const router = Router()

const auth = passport.authenticate('jwt', { session: false, failWithError: true })

router.route('/')
  .get(auth, list)
  .post(create)

router.route('/:id')
  .get(auth, get)
  .patch(auth, update)
  .delete(auth, remove)

module.exports = router
