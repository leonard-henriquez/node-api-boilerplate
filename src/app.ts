import express from 'express'
import middlewares from './config/middlewares'
import routes from './config/routes'
import errorHandler from './middlewares/error'

// Instantiate express framework and apply middlewares
const app = express()

// Add middlewares
middlewares(app)

// Import routes
routes(app)

// Add error handler
errorHandler(app)

export default app
