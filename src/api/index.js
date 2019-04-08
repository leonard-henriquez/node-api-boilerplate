const express = require('express')

// Export function to register routes
module.exports = ({ config, db }) => {
  // Instanciate router
  const api = express.Router()

  // Create routes
  api.post('/', async (req, res) => {
    res.json({ hello: req.params.item })
  })

  api.get('/health', async (req, res) => {
    res.status(200).send()
  })

  return api
}
