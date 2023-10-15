const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  descriptiion: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  weight: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  rating: {
    type: Number,
    default: 0,
  },
  stock: {
    type: String,
    required: true,
    default: "in-stock",
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      review: {
        type: String,
        trim: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = model("Products", productSchema);

module.exports = ProductModel;
