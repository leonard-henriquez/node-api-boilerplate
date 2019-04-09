const { Router } = require('express')
const list = require('./list')

module.exports = (models) => {
  const router = Router()

  router.get('/', list(models))

  return router
}
