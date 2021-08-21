import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import User, { generateJWT } from 'models/user'

export function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'login',
    { session: false },
    function (err, user: User) {
      if (err) {
        return res.status(422).json({
          success: false,
          message: err,
        })
      }

      if (!user) {
        return res.status(422).json({
          success: false,
          message: "User doesn't exist",
        })
      }

      const token = generateJWT(user)
      return res.json({
        name: user.name,
        email: user.email,
        token: token,
      })
    }
  )(req, res, next)
}

export function signup(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('signup', { session: false }, (err, user) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.json({
        success: false,
      })
    }
    return res.json({
      success: true,
    })
  })(req, res, next)
}

export function signout(req: Request, res: Response, next: NextFunction) {}
