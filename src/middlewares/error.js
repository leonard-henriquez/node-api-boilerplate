const logger = require('../helpers/logger').child({ name: 'error' })

// Error handler
const errorHandler = (err, req, res, _next) => {
  // Log error
  logger.error(err)

  // Send response
  res.status(err.status || 500)
    .json({
      status: false,
      error: err.message,
    })
}

module.exports = (app) => {
  // Register errorHandler as a middleware
  app.use(errorHandler)

  return app
}
