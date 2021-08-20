import { Router } from "express";
import auth from "routes/auth";
import * as UserService from "services/user-service";

const router = Router();

router.get("/profile", auth.required, UserService.getUserProfile);

export default router;
