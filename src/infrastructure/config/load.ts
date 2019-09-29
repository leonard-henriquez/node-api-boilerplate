import path from 'path'
import convict from 'convict'
import defaultConfig from './defaults'
import { ConfigInterface } from '@ports'
import dotenv from 'dotenv'

// Load config
const config = convict(defaultConfig)

// Load env config
dotenv.config()
const env = process.env.NODE_ENV
const appRoot = config.get('appRoot')
const envConfigPath = path.join(appRoot, 'config', `${env}.json`)
try {
  config.loadFile(envConfigPath)
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn(`Missing file: ${envConfigPath}`)
}

// Perform validation
config.validate({ allowed: 'strict' })

export default config.getProperties() as ConfigInterface
