declare type ConfigValue = string | number | boolean

declare type ConfigNode = ConfigValue | ConfigObject

declare interface ConfigObject {
  [key: string]: ConfigNode
}

export default interface ConfigInterface {
  host: string
  port: number
  debug: boolean
  env: string
  mongo: {
    URI: string
    options: ConfigObject
  }
  appRoot: string
  log: {
    options: ConfigObject
    stream: string
    file: string
  }
  jwtSecret: string
}
