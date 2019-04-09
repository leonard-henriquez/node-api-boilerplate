const express = require('express')
const config = require('./config')
const logger = require('./config/logger')('server')

// Instantiate express framework and apply middlewares
const app = express()

// Connect to database
require('./config/db')()

// Add middlewares
require('./config/middlewares')(app)

// Import routes
require('./config/routes')(app)

// Add error handler
require('./config/error_handler')(app)

// Create server
const start = async () => {
  try {
    await app.listen(config.port, config.host)
    logger.info(`Server listening on ${config.port} in ${config.env}`)
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

// Instanciate server
start()
