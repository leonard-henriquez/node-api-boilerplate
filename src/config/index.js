require('dotenv').config()
const path = require('path')
const convict = require('convict')
const defaultConfig = require('./default_config')

// Load config
const config = convict(defaultConfig)

// Load env config
const appRoot = config.get('app_root')
const env = config.get('env')
const envConfigPath = path.join(appRoot, 'config', `${env}.json`)
try {
  config.loadFile(envConfigPath)
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn(`Missing file: ${envConfigPath}`)
}

// Perform validation
config.validate({ allowed: 'strict' })

module.exports = config
