import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  description: { type: String },
  imageUrl: { type: String },
});

export default mongoose.model("Products", productSchema);
