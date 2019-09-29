import mongoose from 'mongoose'
import { container } from '@interface/http/container'
import { types } from '@interface/http/types'
import { LoggerInterface, ConfigInterface } from '@ports'

const config = container.get<ConfigInterface>(types.config)
const logger = container.get<LoggerInterface>(types.logger)

mongoose.connection.on('connected', () => {
  logger.info('Connection Established')
})

mongoose.connection.on('reconnected', () => {
  logger.info('Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
  logger.info('Connection Disconnected')
})

mongoose.connection.on('close', () => {
  logger.info('Connection Closed')
})

mongoose.connection.on('error', error => {
  logger.error(error)
})

const connect = async (): Promise<typeof mongoose> => {
  // Set debug
  if (config.debug) {
    mongoose.set('debug', (collection: string, method: string, query: string, doc: string, options: string) => {
      logger.info({
        collection,
        method,
        query,
        doc,
        options,
      })
    })
  }

  // Connect to MongoDb
  const mongo = config.mongo
  return mongoose.connect(mongo.URI, mongo.options)
}

const disconnect = async (): Promise<void> => mongoose.disconnect()

export default { connect, disconnect }
