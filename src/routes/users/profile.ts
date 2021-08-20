import { Router } from "express";
import * as UserService from "services/user-service";

const router = Router();
router.get('/profile', UserService.getUserProfile);

export default router;
