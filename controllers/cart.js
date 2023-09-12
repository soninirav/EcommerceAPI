import Product from "../models/product.js";
import User from "../models/user.js";

export const getCartItems = (req, res, next) => {
  User.findOne({ _id: req.userId })
    .then((user) => {
      res.json(user);
    })
    .catch((e) => next(e));
};

export const addProductToCart = (req, res, next) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  if (quantity <= 0) {
    const err = new Error(
      "product quantity must be greate than or eqal to 1 !!"
    );
    err.statusCode = 400;
    throw err;
  }
  Product.findOne({ _id: productId })
    .then((product) => {
      // if there is no product with given id
      if (!product) {
        const e = new Error("Product with given id does not exist !!");
        e.statusCode = 400;
        throw e;
      }
      User.findOne({ _id: req.userId })
        .then((user) => {
          let found = false;
          const currentItems = user.cart;
          currentItems.items.forEach((item) => {
            if (item.productId == productId) {
              found = true;
              item.quantity += quantity;
            }
          });
          if (!found) {
            currentItems.items.push({
              productId: productId,
              quantity: quantity,
            });
          }
          user.cart = currentItems;
          user.save().then((result) => {
            return res
              .status(200)
              .json({ message: "Product has been added to cart !!" });
          });
        })
        .catch((e) => next(e));
    })
    .catch((e) => next(e));
};

export const deleteProductFromCart = (req, res, next) => {
  Product.findOne({ _id: req.body.productId })
    .then((product) => {
      if (!product) {
        const er = new Error("Product Id is not valid !!");
        er.statusCode = 400;
        throw er;
      }
      User.findOne({ _id: req.userId })
        .then((user) => {
          let idx = -1;
          user.cart.items.forEach((arr, index) => {
            if (arr.productId.toString() == req.body.productId) {
              idx = index;
            }
          });
          if (idx < 0) {
            const err = new Error("given product id is not in cart !!");
            err.statusCode = 400;
            throw err;
          }
          const currentItems = user.cart.items;
          currentItems.pop(idx);
          user.cart.items = currentItems;
          user.save().then((result) => {
            res
              .status(200)
              .json({ message: "product has been removed from cart !!" });
          });
        })
        .catch((e) => next(e));
    })
    .catch((e) => next(e));
};
