import express from "express";
import mongoose from "mongoose";

import userRouter from "./routes/user.js";

const app = express();

// to parse json body
app.use(express.json());

app.use("/users", userRouter);

mongoose
  .connect("mongodb://localhost:27017/EcommerceAPI")
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });