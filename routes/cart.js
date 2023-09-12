import express from "express";

const router = express.Router();

import {
  addProductToCart,
  deleteProductFromCart,
  getCartItems,
} from "../controllers/cart.js";
import { isAuth } from "../middleware/isAuth.js";

router.get("/", isAuth, getCartItems);

router.post("/", isAuth, addProductToCart);

router.delete("/delete", isAuth, deleteProductFromCart);

export default router;
