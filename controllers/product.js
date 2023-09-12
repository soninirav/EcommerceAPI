import Product from "../models/product.js";
import User from "../models/user.js";

export const createProduct = (req, res, next) => {
  // get user data
  User.findById(req.userId)
    .then((user) => {
      // if user is not seller
      if (!user.isSeller) {
        const err = new Error(
          "You are not authorised seller to create product !!"
        );
        err.statusCode = 401;
        throw err;
      }
      const title = req.body.title;
      const price = req.body.price;
      const description = req.body.description;
      const imageUrl = req.body.imageUrl;

      const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.userId,
      });

      product.save().then((p) => {
        res.status(201).json({
          message: "Product created successfully !!",
          productId: p._id,
        });
      });
    })
    .catch((e) => {
      next(e);
    });
};

// return specific product details
export const getProductDetails = (req, res, next) => {
  Product.findOne({ _id: req.params.productId })
    .then((product) => {
      if (product) {
        return res.status(200).json(product);
      } else {
        return res
          .status(400)
          .json({ message: "Did not product with provided Id !!" });
      }
    })
    .catch((e) => {
      return res.status(400).json({
        message:
          "Invalid Product ID !! Product ID must be a string of 12 bytes or a string of 24 hex characters or an integer",
      });
    });
};

// return all products
export const getAllProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res
        .status(200)
        .json({ totalProducts: products.length, products: products });
    })
    .catch((e) => next(e));
};

export const updateProduct = (req, res, next) => {
  Product.findOneAndReplace({ _id: req.params.productId }, req.body, {
    returnDocument: "after",
  })
    .then((product) => {
      return res.status(200).json({
        message: "Product details Updated !!",
        updatedProduct: product,
      });
    })
    .catch((e) => {
      return res.status(404).json({ message: "Provided ID is incorrect !!" });
    });
};

export const deleteProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.productId })
    .then((product) => {
      // if no product has given id
      if (!product) {
        const error = new Error("There is no product with given Id");
        error.statusCode = 400;
        throw error;
      }
      // if seller is trying to delete product which isnt created by him
      if (product.userId.toString() != req.userId.toString()) {
        const error = new Error(
          "You are not authorised to perform this action !!"
        );
        error.statusCode = 403;
        throw error;
      }
      Product.findOneAndDelete({ _id: req.params.productId }).then((p) => {
        res.status(200).json({ message: "product Deleted", deletedProduct: p });
      });
    })
    .catch((e) => next(e));
};
