const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const User = require('../resources/user/user.model')
const config = require('../config')

const verify = async (payload, next) => {
  const user = await User.findById(payload.id)

  if (user) {
    return next(null, {
      id: user.id,
      email: user.email,
    })
  }

  return next(null, false)
}

module.exports = () => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('jwt_secret'),
  }
  const strategy = new Strategy(options, verify)
  passport.use(strategy)

  return passport.initialize()
}
