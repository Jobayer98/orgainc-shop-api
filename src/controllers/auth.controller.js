const User = require("../models/user.model");
const CustomError = require("../utils/CustomError");

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      throw new CustomError("Account already exists", 400);
    }

    user = await User.create(req.body);
    const token = await user.generateToken();
    user.password = undefined;
    res.status(201).json({
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("Account doesn't exist", 400);
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new CustomError("invalid credentials", 401);
    }

    const token = await user.generateToken();
    user.password = undefined;
    res.status(200).json({
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

const logout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new CustomError("Account doesn't exist", 400);
    }
    user.tokens = [];
    await user.save();

    res.status(200).json({
      success: true,
      msg: "Logged out successfully",
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("Account doesn't exist", 400);
    }

    const mail = await main(email);

    res.status(200).json({
      success: true,
      data: mail.messageId,
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

module.exports = {
  signup,
  login,
  logout,
  resetPassword,
};
