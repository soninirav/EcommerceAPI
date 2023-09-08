import express from "express";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

router.post("/create", createProduct);

router.get("/:productId", getProduct);

router.put("/:productId", updateProduct);

export default router;
