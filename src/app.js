const express = require('express')
const connect = require('./config/db')
const middlewares = require('./config/middlewares')
const routes = require('./config/routes')
const errorHandler = require('./config/error_handler')

// Instantiate express framework and apply middlewares
const app = express()

// Connect to database
connect()

// Add middlewares
middlewares(app)

// Import routes
routes(app)

// Add error handler
errorHandler(app)

module.exports = app
