import { Router } from 'express'
import userRouter from '@interface/http/controllers/user/user.router'
import authRouter from '@interface/http/controllers/auth/auth.router'

// Register routes
export default (app: Router): Router => {
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
