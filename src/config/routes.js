const { Router } = require('express')
const { User } = require('../models/user')
const users = require('../controllers/users')

const models = { User }

// Export function to register routes
module.exports = (app) => {
  // Instanciate router
  const router = Router()

  // Create routes
  router.use('/users', users(models))

  router.get('/health', async (req, res) => {
    res.status(200).send()
  })

  app.use('/api', router)

  return app
}
