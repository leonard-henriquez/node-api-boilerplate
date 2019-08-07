const { NotFound } = require('../helpers/error_types')

module.exports = (app) => {
  app.use((req, res, next) => {
    if (!res.headersSent) throw new NotFound()
  })
  return app
}
