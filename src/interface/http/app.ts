import express from 'express'
import routes from '@config/routes'
import middlewares from '@interface/http/middlewares'
import errorHandler from '@interface/http/error/handler'

// Instantiate express framework and apply middlewares
const app = express()

// Add middlewares
middlewares(app)

// Import routes
routes(app)

// Add error handler
errorHandler(app)

export default app
