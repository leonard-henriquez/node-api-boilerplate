import 'reflect-metadata'
import http from 'http'
import { LoggerInterface, ConfigInterface } from '@ports'
import { container } from '@interface/http/container'
import { types } from '@interface/http/types'
import db from '@infrastructure/database/db'
import app from '@interface/http/app'

const logger = container.get<LoggerInterface>(types.logger)
const config = container.get<ConfigInterface>(types.config)

const { host, env, port } = config

const start = (): Promise<http.Server> =>
  new Promise(
    async (resolve, reject): Promise<http.Server | void> => {
      try {
        await db.connect()

        const server = http.createServer(app)

        server.on('error', error => {
          reject(error)
        })

        server.listen(port, host, () => {
          resolve(server)
        })
      } catch (error) {
        logger.error(error)
        reject(error)
      }
    },
  )

const onStartUntilSignal = async (server: http.Server): Promise<http.Server> => {
  logger.info(`Server listening on ${host}:${port} in ${env} mode`)

  await onExitSignal()
  return Promise.resolve(server)
}

const onExitSignal = (): Promise<void> =>
  new Promise((resolve): void => {
    process.on('SIGINT', () => resolve())
    process.on('SIGTERM', () => resolve())
  })

const stop = async (server: http.Server | null = null): Promise<void> => {
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
  .catch(error => {
    logger.error(error)
    stop()
  })
