import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from 'routes/validate'
import auth from 'routes/auth'
import * as authService from 'services/auth.service'
import * as userService from 'services/user.service'

const router = Router()

router.post(
  '/signup',
  body('name').notEmpty(),
  body('email').notEmpty(),
  body('password').notEmpty(),
  validate,
  authService.signup
)

router.post(
  '/login',
  body('email').notEmpty(),
  body('password').notEmpty(),
  validate,
  authService.login
)

router.post('/signout', auth.required, authService.signout)

router.get('/profile', auth.required, userService.getUserProfile)

export default router
