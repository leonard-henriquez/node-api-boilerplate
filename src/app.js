const express = require('express')
const middlewares = require('./config/middlewares')
const routes = require('./config/routes')
const errorHandler = require('./middlewares/error')
const notFound = require('./middlewares/not_found')

// Instantiate express framework and apply middlewares
const app = express()

// Add middlewares
middlewares(app)

// Import routes
routes(app)

// Add not found response
notFound(app)

// Add error handler
errorHandler(app)

module.exports = app
