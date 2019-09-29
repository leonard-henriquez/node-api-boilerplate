interface BaseError extends Error {
  status: number
}

class Forbidden extends Error implements BaseError {
  status: number
  constructor() {
    super('Forbidden')
    this.status = 403
  }
}

class NotFound extends Error implements BaseError {
  status: number
  constructor() {
    super('Not Found')
    this.status = 404
  }
}

export { BaseError, Forbidden, NotFound }
