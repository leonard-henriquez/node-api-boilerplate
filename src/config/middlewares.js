const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const logger = require('./logger')

const middlewares = (app, { config }) => {
  // Disable superfluous header
  app.disable('x-powered-by')

  // Add CORS headers
  app.use(cors({ origin: '*' }))

  // Add logger
  app.use(morgan(config.logFormat, { stream: logger.stream }))

  // Add json parser
  app.use(bodyParser.json())

  return app
}

module.exports = middlewares
