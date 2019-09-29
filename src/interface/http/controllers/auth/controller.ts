import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '@domain/user'
import { Forbidden } from '@interface/http/error/types'
import { ConfigInterface } from '@ports'
import { container } from '@interface/http/container'
import { types } from '@interface/http/types'

const config = container.get<ConfigInterface>(types.config)

const secret = config.jwtSecret

const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find all users
    const user = await User.findOne({ email: req.user.email })

    // Return results
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find user
    const user = await User.findOne({ email: req.body.email }).then(result => {
      if (!result) throw new Forbidden()
      return result
    })

    // Check if password are matching
    await user.verifyPassword(req.body.password).then(result => {
      if (!result) throw new Forbidden()
    })

    const payload = {
      id: user.id,
      email: user.email,
    }

    const token = await jwt.sign(payload, secret, { expiresIn: 36000 })

    res.status(200).json({
      status: true,
      token: `Bearer ${token}`,
    })
    next()
  } catch (error) {
    next(error)
  }
}

export { get, login }
