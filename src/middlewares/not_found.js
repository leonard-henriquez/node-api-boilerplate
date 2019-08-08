const { NotFound } = require('../helpers/error_types')

module.exports = (app) => {
  app.use((req, res, _next) => {
    if (!res.headersSent) throw new NotFound()
  })
  return app
}
