import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { ConfigInterface } from '@ports'
import { container } from '@interface/http/container'
import { types } from '@interface/http/types'

const config = container.get<ConfigInterface>(types.config)

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
    secretOrKey: config.jwtSecret,
  }
  const strategy = new Strategy(options, verify)
  passport.use(strategy)

  return passport.initialize()
}
