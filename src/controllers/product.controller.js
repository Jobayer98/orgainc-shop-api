const mongoose = require("mongoose");
const ProductModel = require("../models/product.model");
const CustomError = require("../utils/CustomError");

const getProducts = async (req, res, next) => {
  const { sort, category, limit } = req.query;
  try {
    const query = ProductModel.find();
    if (category) {
      query.where({ category });
    }

    // Handle sorting based on the "sort" parameter
    if (sort === "latest") {
      query.sort("-createdAt");
    } else if (sort === "popularity") {
      query.sort("-rating");
    } else if (sort === "desc") {
      query.sort("-price");
    } else if (sort === "asc") {
      query.sort("price");
    } else {
      query.limit(limit || 10);
    }

    const products = await query.exec();

    if (!products || products.length === 0) {
      return next(new CustomError("Products not found", 404));
    }

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById({
      _id: id,
    });

    if (!product) {
      return next(new CustomError("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

const addProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(new CustomError(error, 400));
  }
};

const getAdminProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find({ user: req.user._id });

    if (!products || products.length === 0) {
      return next(new CustomError("Products not found", 404));
    }

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return next(new CustomError(error, 400));
  }
};

const getAdminProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findOne({ _id: id, user: req.user._id });

    if (!product) {
      return next(new CustomError("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(new CustomError(error, 400));
  }
};
const updateProductByAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return next(new CustomError("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(new CustomError(error, 400));
  }
};

const deleteProductByAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
      return next(new CustomError("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      msg: "Product deleted successfully",
    });
  } catch (error) {
    return next(new CustomError(error, 400));
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  getAdminProducts,
  getAdminProduct,
  updateProductByAdmin,
  deleteProductByAdmin,
};
