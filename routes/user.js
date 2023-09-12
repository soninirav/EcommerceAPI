import express from "express";

const router = express.Router();

import { isSellerUpdate, getLogin, postSignup } from "../controllers/auth.js";
import { isAuth } from "../middleware/isAuth.js";

router.post("/login", getLogin);

router.post("/signup", postSignup);

router.patch("/becomeseller", isAuth, isSellerUpdate);

export default router;
