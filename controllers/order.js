import User from "../models/user.js";
import Order from "../models/order.js";

export const placeOrder = (req, res, next) => {
  User.findOne({ _id: req.userId })
    .then((user) => {
      let currentCartItems = user.cart.items;

      //  if cart is empty
      if (currentCartItems.length == 0) {
        const error = new Error("Cart is empty !!");
        error.statusCode = 400;
        throw error;
      }

      let totalCartPrice = 0;

      currentCartItems.forEach((item) => {
        totalCartPrice += item.price;
      });

      const order = new Order({
        products: currentCartItems,
        totalPrice: totalCartPrice,
        placedById: req.userId,
      });
      user.cart.items = [];
      user.save();
      order
        .save()
        .then((result) => {
          res
            .status(201)
            .json({ message: "Your order has been placed successfully !!" });
        })
        .catch((e) => next(e));
    })
    .catch((e) => next(e));
};

export const getMyOrders = (req, res, next) => {
  Order.find({ placedById: req.userId })
    .then((orders) => {
      res.status(200).json({ orders: orders });
    })
    .catch((e) => next(e));
};
