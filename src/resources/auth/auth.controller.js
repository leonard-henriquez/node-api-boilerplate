const jwt = require('jsonwebtoken')
const User = require('../user/user.model')
const config = require('../../config')

const secret = config.get('jwt_secret')

const get = async (req, res, next) => {
  try {
    // Find all users
    const users = await User.find({})

    // Return results
    res.status(200).json({ users })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    // Find user
    const user = await User.findOne({ email: req.body.email })

    // Check if password are matching
    const passwordMatch = await user.comparePassword(req.body.password)

    if (passwordMatch) {
      const payload = {
        id: user.id,
        email: user.email,
      }

      const token = await jwt.sign(payload, secret, { expiresIn: 36000 })
      res.json({
        success: true,
        token: `Bearer ${token}`,
      })
    }

    next(new Error('Failed to authenticate'))
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    // Find all users
    const users = await User.find({})

    // Return results
    res.status(200).json({ users })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  get,
  login,
  logout,
}
