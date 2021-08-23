import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import { validate } from 'routes/validate'
import auth from 'routes/auth'
import * as productService from 'services/product.service'
import * as serverService from 'services/server.service'

const router = Router()

const sendResponse = function (res: Response, paylod: any) {
  if (!paylod.success) {
    return res.status(500).json(paylod)
  }
  return res.json(paylod)
}

router.get('/', auth.required, async (req: Request, res: Response) => {
  const result = await productService.getProducts()
  return sendResponse(res, result)
})

router.post(
  '/store',
  auth.required,
  body('name').notEmpty(),
  body('code').notEmpty(),
  validate,
  async (req: Request, res: Response) => {
    const { name, code } = req.body
    const result = await productService.createProduct(
      String(name),
      String(code)
    )
    return sendResponse(res, result)
  }
)

router.put(
  '/:id',
  auth.required,
  body('name').notEmpty(),
  body('code').notEmpty(),
  validate,
  async (req: Request, res: Response) => {
    const result = await productService.updateProduct({
      id: Number(req.params.id),
      name: String(req.body.name),
      code: String(req.body.code),
    })
    return sendResponse(res, result)
  }
)

router.delete('/:id', auth.required, async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await productService.deleteProduct(Number(id))
  return sendResponse(res, result)
})

router.get(
  '/:id/servers',
  auth.required,
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await serverService.getServers(Number(id))
    return sendResponse(res, result)
  }
)

export default router
