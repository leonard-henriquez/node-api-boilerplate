const express = require('express')
const middlewares = require('./config/middlewares')
const logger = require('./config/logger')
const config = require('./config/constants')
const connect = require('./config/db')
const api = require('./api')

// Instantiate express framework and apply middlewares
const app = middlewares(express(), { config })

// Connect to database
const db = connect({ config })

// Import routes
app.use('/api', api({ config, db }))

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
