import express from "express";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../controllers/product.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/create", isAuth, createProduct);

router.get("/:productId", getProduct);

router.put("/:productId", isAuth, updateProduct);

export default router;
