import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const { PORT, MONGO_URI } = process.env

// Instantiate express framework
const app = express()

// Add CORS headers
app.use(cors({
  origin: '*',
}))

// Connect to MongoDb
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err))

// Import routes
app.get('/', async (request, reply) => reply.json({ hello: 'world' }))

// Create server
const start = async () => {
  try {
    await app.listen(PORT || 3000)
    console.log(`server listening on ${PORT || 3000}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

// Instanciate server
start()
