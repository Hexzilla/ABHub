import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from 'routes/validate'
import auth from 'routes/auth'
import * as serverService from 'services/server.service'

const router = Router()

router.post(
  '/store',
  auth.required,
  body('address').isIP(4),
  body('name').notEmpty(),
  body('desc').notEmpty(),
  body('productId').isNumeric(),
  validate,
  serverService.storeServer
)

router.post(
  '/update',
  auth.required,
  body('id').isNumeric(),
  body('address').isIP(4),
  body('name').notEmpty(),
  body('desc').notEmpty(),
  body('state').isNumeric(),
  validate,
  serverService.updateServer
)

router.delete('/:id', auth.required, serverService.deleteServer)

export default router
