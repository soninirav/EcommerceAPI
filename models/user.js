import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  name: { type: String },
  isSeller: { type: Boolean },
});

export default mongoose.model("Users", userSchema);
