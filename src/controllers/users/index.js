const { Router } = require('express')
const list = require('./list')

module.exports = (models, { config }) => {
  const router = Router()

  router.get('/', list(models, { config }))

  return router
}
