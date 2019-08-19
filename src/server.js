const http = require('http')
const app = require('./app')
const config = require('./config')
const db = require('./config/db')
const logger = require('./helpers/logger').child({ name: 'server' })

const { host, env, port } = config.get()

const start = () => new Promise(async (resolve, reject) => {
  try {
    await db.connect()

    const server = http.createServer(app)

    server.on('error', (error) => {
      reject(error)
    })

    server.listen(port, host, () => {
      resolve(server)
    })
  } catch (error) {
    logger.error(error)
    reject(error)
  }
})

const onStartUntilSignal = async (server) => {
  logger.info(`Server listening on ${host}:${port} in ${env} mode`)

  await onExitSignal()
  return Promise.resolve(server)
}

const onExitSignal = () => new Promise((resolve) => {
  process.on('SIGINT', () => resolve())
  process.on('SIGTERM', () => resolve())
})

const stop = async (server = null) => {
  try {
    setTimeout(() => {
      throw new Error('Failed to gracefully close connections')
    }, 5000)

    if (server) {
      await server.close()
    }

    await db.disconnect()
    process.exit(0)
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

start()
  .then(onStartUntilSignal)
  .then(stop)
  .catch((error) => {
    logger.error(error)
    stop()
  })
