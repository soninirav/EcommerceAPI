import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "../controllers/product.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/", getAllProducts);

router.post("/create", isAuth, createProduct);

router.get("/:productId", getProductDetails);

router.put("/:productId", isAuth, updateProduct);

router.delete("/:productId", isAuth, deleteProduct);

export default router;
