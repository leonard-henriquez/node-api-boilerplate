const express = require('express')
const middlewares = require('./config/middlewares')
const routes = require('./config/routes')
const errorHandler = require('./config/error')

// Instantiate express framework and apply middlewares
const app = express()

// Add middlewares
middlewares(app)

// Import routes
routes(app)

// Add error handler
errorHandler(app)

module.exports = app
