const { createLogger, format, transports } = require('winston')
const config = require('.')

// Destructures format for easier access
const {
  combine,
  timestamp,
  prettyPrint,
  label,
} = format

// Create default logger that outputs both to file and console
const loggerBuilder = (labelName = undefined) => {
  const logger = createLogger({
    // Minimum log level to output
    level: config.logLevel,
    // Format of output
    format: combine(
      label({ label: labelName }),
      timestamp(),
      prettyPrint(),
    ),
    transports: [
      // Outputs both to file and console
      new transports.File({
        filename: config.logFilename,
        decolorize: true,
      }),
      new transports.Console(),
    ],
  })

  // Add stream for text
  logger.stream = { write(message) { logger.info(message) } }

  // Add stream for json
  logger.streamJson = { write(json) { logger.info(JSON.parse(json)) } }

  return logger
}

module.exports = loggerBuilder
