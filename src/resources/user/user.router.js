import { Router } from 'express'

import {
  list,
  create,
  get,
  update,
  remove,
} from './user.controller'

const router = Router()

router.route('/')
  .get(list)
  .post(create)

router.route('/:id')
  .get(get)
  .patch(update)
  .delete(remove)

export default router
