import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import config from '@config/index'

const verify = async (payload: any, next: any) => {
  try {
    return next(null, payload)
  } catch (error) {
    next(error)
  }
}

export default () => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('jwtSecret'),
  }
  const strategy = new Strategy(options, verify)
  passport.use(strategy)

  return passport.initialize()
}
