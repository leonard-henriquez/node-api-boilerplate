import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../resources/user/user.model'
import config from '../config'

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

export default () => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('jwt_secret'),
  }

  passport.use(
    new Strategy(options, verify),
  )
  return passport.initialize()
}
