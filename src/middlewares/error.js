const logger = require('../helpers/logger').child({ name: 'error' })
const { NotFound } = require('../helpers/error_types')

// Not found handler
const notFoundHandler = (req, res, _next) => {
  if (!res.headersSent) throw new NotFound()
}

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
  // Register notFoundHanlder as a middleware
  app.use(notFoundHandler)

  // Register errorHandler as a middleware
  app.use(errorHandler)

  return app
}
