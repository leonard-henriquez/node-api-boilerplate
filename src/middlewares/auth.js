const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const config = require('../config')

const verify = async (payload, next) => {
  try {
    return next(null, payload)
  } catch (error) {
    next(error)
  }
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
