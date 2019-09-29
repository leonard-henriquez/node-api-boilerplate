import pino from 'pino'
import { injectable, inject } from 'inversify'
import { LoggerInterface, ConfigInterface } from '@ports'
import { types } from '@interface/http/types'

@injectable()
class PinoLogger implements LoggerInterface {
  private _options: any
  private _stream: any
  private _file: string
  private _logger: pino.Logger

  public constructor(@inject(types.config) config: ConfigInterface) {
    this._options = config.log.options
    this._stream = config.log.stream
    this._file = config.log.file
    this.instanciateLogger()
  }

  private instanciateLogger(): void {
    let destination
    if (this._stream === 'extreme' && this._file) {
      destination = pino.extreme(this._file)
    } else if (this._stream === 'file' && this._file) {
      destination = pino.destination(this._file)
    } else {
      destination = pino.destination()
    }
    this._logger = pino(this._options, destination)
  }

  public info(message: any): void {
    this._logger.info(message)
  }

  public debug(message: any): void {
    this._logger.debug(message)
  }

  public log(message: any): void {
    this._logger.log(message)
  }

  public warn(message: any): void {
    this._logger.warn(message)
  }

  public error(message: any): void {
    this._logger.error(message)
  }
}

export default PinoLogger
