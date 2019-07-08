require('dotenv').config()
const convict = require('convict')
const defaultConfig = require('./default_config')

// Load config
const config = convict(defaultConfig)

// Perform validation
config.validate({ allowed: 'strict' })

module.exports = config
