const config = require('.')

const errorHandler = (err, req, res, _next) => {
  let msg = ''
  if (config.env !== 'development') {
    msg = err.message
  }

  res.status(err.status || 500).json({
    message: msg,
    error: err,
  })
}

module.exports = (app) => {
  app.use(errorHandler)

  return app
}
