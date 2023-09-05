import express from "express";

const router = express.Router();

import { getLogin, postSignup } from "../controllers/auth.js";

router.get("/login", getLogin);

router.post("/signup", postSignup);

export default router;
