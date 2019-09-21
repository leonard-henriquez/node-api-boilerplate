import { Router, Request, Response, NextFunction } from 'express'
import { BaseError, NotFound } from '../helpers/error_types'
import loggerFactory from '../helpers/logger'

const logger = loggerFactory.child({ name: 'error' })

// Not found handler
const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  if (!res.headersSent) throw new NotFound()
}

// Error handler
const errorHandler = async (err: BaseError, req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Log error
  logger.error(err)

  // Send response
  res.status(err.status || 500).json({
    status: false,
    error: err.message,
  })
}

export default (app: Router): Router => {
  // Register notFoundHanlder as a middleware
  app.use(notFoundHandler)

  // Register errorHandler as a middleware
  app.use(errorHandler)

  return app
}
