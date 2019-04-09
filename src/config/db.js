const mongoose = require('mongoose')
const logger = require('./logger')
const config = require('./')

module.exports = () => {
  // Set debug
  mongoose.set('debug', config.debug)

  // Connect to MongoDb
  mongoose.connect(config.mongoURI, { useNewUrlParser: true })
    .then(() => logger.info('MongoDB connected…'))
    .catch(err => logger.error(err))

  return mongoose.connection
}
