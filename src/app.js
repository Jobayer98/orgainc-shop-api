const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const cookie = require("cookie-parser");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const authRouter = require("./routes/auth.route");

const app = express();
//cloudinary configation
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//session and cookie middleware
app.use(cookie());
// app.use(
//   session({
//     secret: process.env.JWT_SECRET,
//     httpOnly: true,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
//logger middleware
app.use(morgan("tiny"));
//middleware
app.use(cors());
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1", authRouter);

app.get("*", (req, res) => {
  // console.log(req)
  // res.send("Not found");
  res.status(404).json({
    success: false,
    msg: "Not found",
  });
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    msg: err.message,
  });
});

module.exports = app;
