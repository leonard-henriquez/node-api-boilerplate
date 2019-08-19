const mongoose = require('mongoose')
const config = require('.')
const logger = require('../helpers/logger').child({ name: 'db' })

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

mongoose.connection.on('error', (error) => {
  logger.error(error)
})

const connect = async () => {
  // Set debug
  if (config.get('debug')) {
    mongoose.set('debug', (collection, method, query, doc, options) => {
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

const disconnect = async () => mongoose.disconnect()

module.exports = {
  connect,
  disconnect,
}
