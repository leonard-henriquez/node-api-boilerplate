import pino from 'pino'
import config from '../config'

const { options, stream, file } = config.get('log')

let destination
if (stream === 'extreme' && file) {
  destination = pino.extreme(file)
} else if (stream === 'file' && file) {
  destination = pino.destination(file)
} else {
  destination = pino.destination()
}

export default pino(options, destination)
