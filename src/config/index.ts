import dotenv from 'dotenv'
import path from 'path'
import convict from 'convict'
import defaultConfig from './default_config'

dotenv.config()

// Load config
const config = convict(defaultConfig)

// Load env config
const appRoot = config.get('appRoot')
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

export default config
