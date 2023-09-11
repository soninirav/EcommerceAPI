import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getLogin = (req, res, next) => {
  const email = req.body.email;
  const pwd = req.body.password;
  let currentUser;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        currentUser = user;
        return bcrypt.compare(pwd, user.password);
      }
    })
    .then((isEqual) => {
      // if user is not in database or password is not matching with database
      if (!isEqual) {
        return res
          .status(400)
          .json({ message: "Email or Password is incorrect !!" });
      }
      const token = jwt.sign(
        {
          email: currentUser.email,
          userId: currentUser._id,
        },
        "aB3$DfGh7PqRtYzXv1Ws5JkL8UiOp9Nm2",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ userId: currentUser._id, token: token });
    })
    .then()
    .catch((e) => {
      console.log(e);
    });
};

export const postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const pwd = req.body.password;
  const isSeller = req.body.isSeller || false;

  // here find method will not work because it will return Cursor
  // findone will return null here
  User.findOne({ email: email })
    .then((user) => {
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
          if (!user) {
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
