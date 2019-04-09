import { Router } from 'express'
import userRouter from '../resources/user/user.router'

// Register routes
export default (app) => {
  // Instanciate router
  const router = Router()

  // Create routes
  router.use('/users', userRouter)

  // Route for ping
  router.get('/health', (req, res) => {
    res.status(200).send()
  })

  // Register routes
  app.use('/api', router)

  // Return app
  return app
}
