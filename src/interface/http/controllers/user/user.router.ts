import { Router } from 'express'
import passport from 'passport'
import { list, create, get, update, remove } from './user.controller'

const router = Router()

const auth = passport.authenticate('jwt', { session: false, failWithError: true })

router
  .route('/')
  .get(auth, list)
  .post(create)

router
  .route('/:id')
  .get(auth, get)
  .patch(auth, update)
  .delete(auth, remove)

export default router
