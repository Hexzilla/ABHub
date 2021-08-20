import { Router } from "express";
import { body } from "express-validator";
import auth from "routes/auth";
import * as authService from "services/auth.service";
import * as userService from "services/user.service";

const router = Router();

router.post(
  "/login",
  body("email").notEmpty(),
  body("password").notEmpty(),
  authService.login
);

router.post(
  "/signup",
  body("name").notEmpty(),
  body("email").notEmpty(),
  body("password").notEmpty(),
  authService.signup
);

router.get("/profile", auth.required, userService.getUserProfile);

export default router;
