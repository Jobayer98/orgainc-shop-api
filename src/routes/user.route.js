const express = require("express");
const {
  updateUserInfo,
  uploadUserPhoto,
  updateUserPassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.patch("/user/update", auth, updateUserInfo);
router.post("/user/upload-image", auth, uploadUserPhoto);
router.patch("/user/update-password", auth, updateUserPassword);
router.get("/forgot-password", auth, forgotPassword);
router.post("/password/reset/:token", auth, resetPassword);

module.exports = router;
