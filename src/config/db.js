const mongoose = require('mongoose')
const config = require('./')
const logger = require('./logger')('db')

module.exports = () => {
  // Set debug
  if (config.debug) {
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
  mongoose.connect(config.mongoURI, { useNewUrlParser: true })
    .then(() => logger.info('MongoDB connected…'))
    .catch(err => logger.error(err))

  // Return connection
  return mongoose.connection
}
