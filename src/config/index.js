import { } from 'dotenv/config'
import convict from 'convict'
import defaultConfig from './default_config'

// Load config
const config = convict(defaultConfig)

// Perform validation
config.validate({ allowed: 'strict' })

export default config
