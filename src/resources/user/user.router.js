const { Router } = require('express')

const {
  list,
  create,
  get,
  update,
  remove,
} = require('./user.controller')

const router = Router()

router.route('/')
  .get(list)
  .post(create)

router.route('/:id')
  .get(get)
  .patch(update)
  .delete(remove)

module.exports = router
