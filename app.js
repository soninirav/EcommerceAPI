import express from "express";
import mongoose from "mongoose";

import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import { errorHandler } from "./routes/error.js";

const app = express();

// to parse json body
app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.use(errorHandler);

mongoose
  .connect("mongodb://localhost:27017/EcommerceAPI")
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
