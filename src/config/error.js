const config = require('.')
const logger = require('./logger').child({ name: 'error' })

// Build response for the client
const response = (err) => {
  if (config.env === 'development') {
    return {
      message: err.message,
      error: err,
    }
  }

  return {
    message: err.message,
    error: {},
  }
}

// Build error message from error object
const logMessage = err => ({ message: err.message, stack: err.stack.split('\n') })

// Error handler
const errorHandler = (err, req, res, _next) => {
  // Log error
  logger.error(logMessage(err))

  // Send response
  res.status(err.status || 500)
    .json(response(err))
}

module.exports = (app) => {
  // Register errorHandler as a middleware
  app.use(errorHandler)

  return app
}
