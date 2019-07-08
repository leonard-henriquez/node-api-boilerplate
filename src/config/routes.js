const { Router } = require('express')
const userRouter = require('../resources/user/user.router')
const authRouter = require('../resources/auth/auth.router')

// Register routes
module.exports = (app) => {
  // Instanciate router
  const router = Router()

  // Create routes
  router.use('/users', userRouter)
  router.use('/auth', authRouter)

  // Route for ping
  router.get('/health', (req, res) => {
    res.status(200).send()
  })

  // Register routes
  app.use('/api', router)

  // Return app
  return app
}
