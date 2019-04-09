const express = require('express')
const config = require('./config')
const logger = require('./config/logger')

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
    await app.listen(config.port)
    logger.info(`server listening on ${config.port}`)
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

// Instanciate server
start()
