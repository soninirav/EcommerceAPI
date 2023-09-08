import Product from "../models/product.js";

export const createProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
  });

  product
    .save()
    .then((p) => {
      res
        .status(201)
        .json({ message: "Product created successfully !!", productId: p._id });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getProduct = (req, res, next) => {
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
