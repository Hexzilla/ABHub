import { Router } from "express";
import { body } from "express-validator";
import auth from "routes/auth";
import * as productService from "services/product.service";

const router = Router();

router.get("/", auth.required, productService.getProducts);

router.post("/store", auth.required, productService.storeProduct);

export default router;
