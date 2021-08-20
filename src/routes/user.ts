import { Router } from "express";
import auth from "routes/auth";
import * as authService from "services/auth.service";
import * as userService from "services/user.service";

const router = Router();

router.post("/login", authService.login);
router.get("/profile", auth.required, userService.getUserProfile);

export default router;
