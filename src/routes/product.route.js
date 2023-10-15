const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  getAdminProducts,
  updateProductByAdmin,
  getAdminProduct,
  deleteProductByAdmin,
} = require("../controllers/product.controller");
const { IsAdmin } = require("../middlewares/middleware");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProduct);

//admin route
router.post("/add-product", auth, IsAdmin, addProduct);
router.get("/admin/products", auth, IsAdmin, getAdminProducts);
router.get("/admin/product/:id", auth, IsAdmin, getAdminProduct);
router.patch("/admin/product/:id", auth, IsAdmin, updateProductByAdmin);
router.delete("/admin/product/:id", auth, IsAdmin, deleteProductByAdmin);

module.exports = router;
