import 'dotenv/config'

const { MONGO_URI } = process.env

// Require the fastify framework and instantiate it
const fastify = require('fastify')({
  logger: true,
})

const mongoose = require('mongoose')

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err))

fastify.get('/', async (request, reply) => ({ hello: 'world' }))

const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
