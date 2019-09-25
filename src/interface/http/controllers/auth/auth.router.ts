import passport from 'passport'
import { Router } from 'express'
import { get, login } from './auth.controller'

const router = Router()

const auth = passport.authenticate('jwt', { session: false, failWithError: true })

router
  .route('/')
  .get(auth, get)
  .post(login)

export default router
