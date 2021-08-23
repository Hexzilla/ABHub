import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import { validate } from 'routes/validate'
import auth from 'routes/auth'
import { sendJsonResponse } from 'helpers'
import * as serverService from 'services/server.service'

const router = Router()

router.post(
  '/store',
  auth.required,
  body('productId').isNumeric(),
  body('address').isIP(4),
  body('name').notEmpty(),
  body('desc').notEmpty(),
  validate,
  async (req: Request, res: Response) => {
    const { productId, address, name, desc } = req.body
    const result = await serverService.createServer(
      productId,
      address,
      name,
      desc
    )
    return sendJsonResponse(res, result)
  }
)

router.put(
  '/:id',
  auth.required,
  body('address').isIP(4),
  body('name').notEmpty(),
  body('desc').notEmpty(),
  body('state').isNumeric(),
  validate,
  async (req: Request, res: Response) => {
    const { address, name, desc, state } = req.body
    const result = await serverService.updateServer(
      Number(req.params.id),
      address,
      name,
      desc,
      state
    )
    return sendJsonResponse(res, result)
  }
)

router.delete('/:id', auth.required, async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await serverService.deleteServer(Number(id))
  return sendJsonResponse(res, result)
})

export default router
