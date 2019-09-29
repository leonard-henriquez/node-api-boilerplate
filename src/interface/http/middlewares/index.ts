import { Express } from 'express'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import cors from 'cors'
import httpLogger from '@interface/http/middlewares/http_logger'
import auth from '@interface/http/middlewares/auth'

const middlewares = (app: Express): Express => {
  // Disable superfluous header
  app.disable('x-powered-by')

  // Add logger
  app.use(httpLogger())

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
