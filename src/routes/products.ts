import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from 'routes/validate'
import auth from 'routes/auth'
import * as productService from 'services/product.service'

const router = Router()

router.get('/', auth.required, productService.getProducts)

router.post(
  '/store',
  auth.required,
  body('name').notEmpty(),
  body('code').notEmpty(),
  validate,
  productService.storeProduct
)

router.post(
  '/update',
  auth.required,
  body('id').isNumeric(),
  body('name').notEmpty(),
  body('code').notEmpty(),
  validate,
  productService.updateProduct
)

router.delete('/:id', auth.required, productService.deleteProduct)

export default router
