import path from 'path'

const appRoot = path.resolve(path.join(__dirname, '..', '..'))

export default {
  host: {
    doc: 'Hostname for server',
    default: '0.0.0.0',
    format: String,
    env: 'HOSTNAME',
  },
  port: {
    doc: 'Port for server',
    default: 3000,
    format: 'port',
    env: 'PORT',
  },
  debug: {
    doc: 'Debuggging mode',
    format: Boolean,
    default: true,
    env: 'DEBUG',
  },
  env: {
    doc: 'Applicaton environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  mongo: {
    URI: {
      doc: 'URI for connecting Mongo DB',
      format: String,
      default: null,
      env: 'MONGO_URI',
    },
    options: {
      doc: 'Options for Mongo DB',
      format: Object,
      default: {
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    },
  },
  app_root: {
    default: appRoot,
  },
  log: {
    filename: {
      default: 'logs/app.log',
    },
    level: {
      default: 'debug',
      format: ['error', 'warn', 'info', 'verbose', 'debug', 'silly'],
      env: 'LOG_LEVEL',
    },
  },
  jwt_secret: {
    doc: 'JWT secret',
    format: String,
    default: 'secret',
    env: 'JWT_SECRET',
  },
}
