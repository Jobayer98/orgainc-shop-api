const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const CustomError = require("../utils/CustomError");

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      email: decoded.email,
      "tokens.token": token,
    });

    if (!user) {
      return next(new CustomError("Authentication failed", 401));
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new CustomError("invalid credentials or session expired", 400));
  }
};

module.exports = auth;
