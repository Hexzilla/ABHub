import { Router } from "express";
import profile from "./profile";

const router = Router();
router.get("/profile", profile);

export default router;
