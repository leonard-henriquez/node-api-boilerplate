class Forbidden extends Error {
  constructor() {
    super('Forbidden')
    this.status = 403
  }
}

class NotFound extends Error {
  constructor() {
    super('Not Found')
    this.status = 404
  }
}

module.exports = {
  Forbidden,
  NotFound,
}
