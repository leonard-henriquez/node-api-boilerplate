require('dotenv').config()
const path = require('path')

// Environment settings
const appRoot = path.resolve(path.join(__dirname, '..', '..'))
const env = process.env.NODE_ENV || 'development'
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const debug = process.env.DEBUG || (env === 'development')
const mongoURI = process.env.MONGO_URI

// Logs
const logFilename = path.join(appRoot, 'logs', 'app.log')
const logFormat = process.env.LOG_FORMAT || 'combined'
const logLevel = process.env.LOG_LEVEL || 'debug'

// Export config
module.exports = {
  appRoot,
  env,
  host,
  port,
  debug,
  mongoURI,
  logFormat,
  logLevel,
  logFilename,
}
