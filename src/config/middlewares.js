import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import cors from 'cors'
import config from '.'
import loggerFactory from '../helpers/logger'

const logger = loggerFactory('request', config.get('log'))

const format = (tokens, req, res) => JSON.stringify({
  method: tokens.method(req, res),
  url: tokens.url(req, res),
  status: parseInt(tokens.status(req, res), 10),
  remoteAddress: tokens['remote-addr'](req, res),
  responseTime: parseFloat(tokens['response-time'](req, res)),
})

const middlewares = (app) => {
  // Disable superfluous header
  app.disable('x-powered-by')

  // Add compression
  app.use(compression())

  // Add logger
  app.use(morgan(format, { stream: logger.streamJson }))

  // Add json parser
  app.use(bodyParser.json())

  // Add method overrider
  app.use(methodOverride())

  // Add CORS headers
  app.use(cors({ origin: '*' }))

  return app
}

export default middlewares
