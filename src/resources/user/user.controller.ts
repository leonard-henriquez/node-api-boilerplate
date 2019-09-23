import { Request, Response, NextFunction } from 'express'
import User from './user.model'

const list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find all users
    const users = await User.find({})

    // Return results
    res.status(200).json({ users })
  } catch (error) {
    next(error)
  }
}

const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Create user
    await User.create(req.body)
    const user = await User.findOne({ email: req.body.email })

    // Return result
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find user
    const user = await User.findOne({ _id: req.params.id })

    // Return user
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find and update user
    await User.updateOne({ _id: req.params.id }, req.body)
    const user = await User.findOne({ _id: req.params.id })

    // Return result
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find and remove user
    await User.deleteOne({ _id: req.params.id })

    // Return result
    res.status(200).json({ status: true })
  } catch (error) {
    next(error)
  }
}

export { list, create, get, update, remove }
