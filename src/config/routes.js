const { Router } = require('express')
const { User } = require('../models/user')
const users = require('../controllers/users')

const models = { User }

// Register routes
module.exports = (app) => {
  // Instanciate router
  const router = Router()

  // Create routes
  router.use('/users', users(models))

  // Route for ping
  router.get('/health', async (req, res) => {
    res.status(200).send()
  })

  // Register routes
  app.use('/api', router)

  // Return app
  return app
}
