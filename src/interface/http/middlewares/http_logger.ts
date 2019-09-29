import morgan from 'morgan'
import { container } from '../container'
import { LoggerInterface } from '@ports'
import { types } from '../types'

const logger = container.get<LoggerInterface>(types.logger)

export default () =>
  morgan('short', {
    stream: {
      write: (message: string): void => logger.info(message),
    },
  })
