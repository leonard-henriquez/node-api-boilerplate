const pino = require('pino')
const config = require('.')

const { options, stream, file } = config.get('log')

let destination
if (stream === 'extreme' && file) {
  destination = pino.extreme(file)
} else if (stream === 'file' && file) {
  destination = pino.destination(file)
} else {
  destination = pino.destination()
}

module.exports = pino(options, destination)
