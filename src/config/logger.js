const winston = require('winston')
const config = require('./constants')

const fileOptions = {
  filename: config.logFilename,
  level: config.logLevel,
  decolorize: true,
}

const consoleOptions = {
  format: winston.format.simple(),
  level: config.logLevel,
}

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(fileOptions),
    new winston.transports.Console(consoleOptions),
  ],
})

logger.stream = {
  write(message) {
    logger.info(message)
  },
}

module.exports = logger
