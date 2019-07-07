import passport from 'passport'
import { Router } from 'express'

import {
  get,
  login,
  logout,
} from './auth.controller'

const router = Router()

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), get)
  .post(login)
  .delete(logout)

export default router
