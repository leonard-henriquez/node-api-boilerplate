const mongoose = require('mongoose')
const config = require('.')
const logger = require('./logger').child({ name: 'db' })

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
