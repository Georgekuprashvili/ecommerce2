const express = require("express");
const connectToDb = require("../db/connectToDb");
const productModel = require("../models/product.model");
const allproductsModel = require("../models/allproducts.model");
const authRouter = require("../routes/auth.router");
const isAuth = require("../middlewares/isAuth");
const cors = require("cors");
require("dotenv").config();
const adminRouter = require("../routes/admin.route");

const app = express();

app.use(cors());
app.use(express.json());
connectToDb();

app.use("/api/admin", adminRouter);
app.use("/auth", authRouter);

app.get("/api/products", async (req, res) => {
  const products = await productModel.find();
  res.json(products);
});

module.exports = app;
