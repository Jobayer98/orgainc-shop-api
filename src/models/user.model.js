const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
      trim: true,
      //   validate: {
      //     validator: function (password) {
      //       const passwordRegex =
      //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

      //       return passwordRegex.test(password);
      //     },
      //     message:
      //       "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
      //   },
    },
    address: {
      city: {
        type: String,
        trim: true,
        default: null,
      },
      street: {
        type: String,
      },
      postalCode: {
        type: String,
      },
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    image: {
      id: String,
      secure_url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.forgotPasswordToken;
  delete userObject.forgotPasswordTokenExpiry;

  return userObject;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET
  );
  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

userSchema.methods.getforgotPasswordToken = async function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.forgotPasswordTokenExpiry = Date.now() + 5 * 60 * 1000;

  return token;
};

const User = model("User", userSchema);

module.exports = User;
