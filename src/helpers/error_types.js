class AuthenticationError extends Error {
  constructor() {
    super('Not Authenticated')
    this.status = 403
  }
}

module.exports = {
  AuthenticationError,
}
