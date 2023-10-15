const CustomError = require("../utils/CustomError");

exports.IsAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new CustomError("You are not admin", 400));
  }
  next();
};
