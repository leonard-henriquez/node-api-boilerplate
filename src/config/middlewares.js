const compression = require('compression')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors')
const pino = require('express-pino-logger')
const logger = require('../helpers/logger')
const authentication = require('../helpers/authentication')

const middlewares = (app) => {
  // Disable superfluous header
  app.disable('x-powered-by')

  // Add compression
  app.use(compression())

  // Add logger
  app.use(pino({ logger }))

  // Add authentication
  app.use(authentication())

  // Add json parser
  app.use(bodyParser.json())

  // Add method overrider
  app.use(methodOverride())

  // Add CORS headers
  app.use(cors({ origin: '*' }))

  return app
}

module.exports = middlewares
