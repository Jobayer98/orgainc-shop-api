const ProductModel = require("../models/product.model");
const CustomError = require("../utils/CustomError");

const getProducts = async (req, res, next) => {
  const { sort, category } = req.query;
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
    const product = await ProductModel.findById(id);

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

module.exports = {
  getProducts,
  getProduct,
};
