import { Router, Request, Response, NextFunction } from 'express'
import user from './user'
import products from './products'
import servers from './servers'

const router = Router()

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors: any, key: string) => {
        errors[key] = err.errors[key].message
        return errors
      }, {}),
    })
  }

  return next(err)
})

router.get('/', (req, res) => res.send('Welcome!'))
router.use('/user', user)
router.use('/product', products)
router.use('/server', servers)

export default router
