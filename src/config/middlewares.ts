import { Express } from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import cors from 'cors'
import pino from 'express-pino-logger'
import logger from '../helpers/logger'
import auth from '../middlewares/auth'

const middlewares = (app: Express): Express => {
  // Disable superfluous header
  app.disable('x-powered-by')

  // Add compression
  app.use(compression())

  // Add logger
  app.use(pino({ logger }))

  // Add authentication
  app.use(auth())

  // Add json parser
  app.use(bodyParser.json())

  // Add method overrider
  app.use(methodOverride())

  // Add CORS headers
  app.use(cors({ origin: '*' }))

  return app
}

export default middlewares
