const mongoose = require('mongoose')
const loggerFactory = require('../helpers/logger')
const config = require('.')

const logger = loggerFactory('db', config.get('log'))

module.exports = () => {
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
  mongoose.connect(mongo.URI, mongo.options)
    .then(() => logger.info('MongoDB connected'))
    .catch(error => logger.error(error))

  // Return connection
  return mongoose.connection
}
