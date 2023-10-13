const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const authRouter = require("./routes/authRoute");

//cloudinary configation
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", restaurantRouter);
app.use("/api/v1", orderRouter);

app.get("/", (req, res) => {
  // console.log(req)
  res.send("Welcome to Food Delivery System");
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    msg: err.message,
  });
});

module.exports = app;
