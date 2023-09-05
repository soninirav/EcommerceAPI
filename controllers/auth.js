import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getLogin = (req, res, next) => {
  console.log("Logged in ");
  res.sendStatus(200);
  next();
};

export const postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const pwd = req.body.password;
  const isSeller = req.body.isSeller || false;

  // here find method will not work because it will return Cursor
  // findone will return null here
  User.findOne({ email: email })
    .then((one) => {
      bcrypt
        .hash(pwd, 13)
        .then((hashedPwd) => {
          const user = new User({
            email: email,
            name: name,
            password: hashedPwd,
            isSeller: isSeller,
          });
          return user;
        })
        .then((u) => {
          //if we dont have an existing user with same email
          if (!one) {
            u.save();
            return res
              .status(201)
              .json({ message: "User Created", userId: u._id });
          }
          return res.status(409).json({ message: "User Already Exists !!" });
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
    });
};
