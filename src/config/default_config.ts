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
      default: '',
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
  appRoot: {
    default: appRoot,
  },
  log: {
    options: {
      doc: 'Options for log',
      format: Object,
      default: {
        enable: true,
        prettyPrint: true,
        level: 'debug',
      },
    },
    stream: {
      doc: 'Output destination for log',
      format: ['console', 'file', 'extreme'],
      default: 'console',
      env: 'LOG_STREAM',
    },
    file: {
      doc: 'File destination for log',
      format: String,
      default: undefined,
      env: 'LOG_FILE',
    },
  },
  jwtSecret: {
    doc: 'JWT secret',
    format: String,
    default: 'secret',
    env: 'JWT_SECRET',
  },
}
