import { Container } from 'inversify'
import { types } from './types'
import { LoggerInterface, ConfigInterface } from '@ports'
import { PinoLogger } from '@infrastructure/logger'
import { config } from '@infrastructure/config'

const container = new Container()

container.bind<LoggerInterface>(types.logger).to(PinoLogger)
container.bind<ConfigInterface>(types.config).toConstantValue(config)

export { container }
