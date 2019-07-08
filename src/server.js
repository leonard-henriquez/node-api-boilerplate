import app from './app'
import config from './config'
import loggerFactory from './helpers/logger'

// Create server
const start = () => {
  const { host, env, port } = config.get()
  const logger = loggerFactory('server', config.get('log'))

  try {
    app.listen(port, host)
    logger.info(`Server listening on ${host}:${port} in ${env} mode`)
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

// Instanciate server
start()
