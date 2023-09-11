import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const authenticationHeader = req.get("Authorization");
  if (!authenticationHeader) {
    const error = Error("not authenticated");
    error.statusCode = 401;
    throw error;
  }
  const token = authenticationHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "aB3$DfGh7PqRtYzXv1Ws5JkL8UiOp9Nm2");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = Error("Not authenticated !!");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;

  next();
};
