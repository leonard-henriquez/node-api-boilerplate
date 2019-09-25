import mongoose from 'mongoose'
import config from '.'
import loggerFactory from '@infrastructure/logger'

const logger = loggerFactory.child({ name: 'db' })

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
  if (config.get('debug')) {
    mongoose.set('debug', (collection: any, method: any, query: any, doc: any, options: any) => {
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
  const mongo = config.get('mongo')
  return mongoose.connect(mongo.URI, mongo.options)
}

const disconnect = async (): Promise<void> => mongoose.disconnect()

export default { connect, disconnect }
