import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  description: { type: String },
  imageUrl: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User", require: true },
});

export default mongoose.model("Products", productSchema);
