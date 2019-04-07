// Import environment variables
import 'dotenv/config'

const { PORT, MONGO_URI } = process.env

// Import the fastify framework and instantiate it
const fastify = require('fastify')({
  logger: true,
})

// Add CORS headers
fastify.register(require('fastify-cors'), {
  origin: '*',
})

// Import mongoose ODM
const mongoose = require('mongoose')

// Connect to MongoDb
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err))

// Import routes
fastify.get('/', async (request, reply) => ({ hello: 'world' }))

// Create server
const start = async () => {
  try {
    await fastify.listen(PORT || 3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

// Instanciate server
start()
