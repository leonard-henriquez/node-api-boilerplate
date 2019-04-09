const compression = require('compression')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors')
const logger = require('./logger')
const config = require('./')

const middlewares = (app) => {
  // Disable superfluous header
  app.disable('x-powered-by')

  // Add compression
  app.use(compression())

  // Add logger
  app.use(morgan(config.logFormat, { stream: logger.stream }))

  // Add json parser
  app.use(bodyParser.json())

  // Add method overrider
  app.use(methodOverride())

  // Add CORS headers
  app.use(cors({ origin: '*' }))

  return app
}

module.exports = middlewares
