import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getCart,
  getProduct,
  updateProduct,
} from "../controllers/product.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/cart", isAuth, getCart);

router.get("/", getAllProducts);

router.post("/create", isAuth, createProduct);

router.get("/:productId", getProduct);

router.put("/:productId", isAuth, updateProduct);

router.delete("/:productId", isAuth, deleteProduct);

export default router;
