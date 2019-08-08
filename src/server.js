const app = require('./app')
const config = require('./config')
const db = require('./config/db')
const logger = require('./helpers/logger').child({ name: 'server' })

// Connect to database
db.connect()

// Create server
const start = () => {
  const { host, env, port } = config.get()

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
