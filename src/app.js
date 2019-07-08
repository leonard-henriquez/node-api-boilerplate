import express from 'express'
import connect from './config/db'
import middlewares from './config/middlewares'
import routes from './config/routes'
import errorHandler from './config/error_handler'

// Instantiate express framework and apply middlewares
const app = express()

// Connect to database
connect()

// Add middlewares
middlewares(app)

// Import routes
routes(app)

// Add error handler
errorHandler(app)

export default app
