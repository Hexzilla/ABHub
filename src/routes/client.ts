import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from 'routes/validate'
import auth from 'routes/auth'
import * as clientService from 'services/client.service'

const router = Router()

router.post(
  '/store',
  auth.required,
  body('serverId').isNumeric(),
  validate,
  clientService.storeClient
)

router.delete('/:id', auth.required, clientService.deleteClient)

export default router
