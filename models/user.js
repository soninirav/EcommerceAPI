import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  name: { type: String },
  isSeller: { type: Boolean },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = (product) => {
  console.log("in user model", product);
};

export default mongoose.model("Users", userSchema);
