const express = require("express");
const { signup, login, logout } = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", auth, logout);

module.exports = router;
