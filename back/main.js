const express = require("express");
const connectToDb = require("./db/connectToDb");
const productModel = require("./models/product.model");
const { isValidObjectId } = require("mongoose");
const allproductsModel = require("./models/allproducts.model");
const cors = require("cors");
const multer = require("multer");
const authRouter = require("./routes/auth.router");

const { upload, deleteFromCloudinary } = require("./config");
const app = express();
app.use(cors());
connectToDb();
app.use(express.json());
require("dotenv").config();
app.use("/auth", authRouter);
const cartRouter = require("./routes/cart.route");
const orderRouter = require("./routes/order.route");

app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.use(express.static("uploads"));

app.get("/api/products", async (req, res) => {
  const products = await productModel.find();

  res.json(products);
});

app.post("/api/products", async (req, res) => {
  const { name, price, description, quantity } = req.body;

  if (!name || !price || !description || !quantity) {
    return res.status(400).json({ error: "fill required fields " });
  }
  const createdProduct = await productModel.create({
    name,
    price,
    description,
    quantity,
  });
  res.status(201).json({ message: "product created successfully" });
});

app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "wrong id is provided" });
  }
  const product = await productModel.findById(id);
  if (!product) {
    return res.status(404).json({ error: "product not found" });
  }
  res.json(product);
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "wrong id is provided" });
  }

  const deletedProduct = await productModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    return res.status(404).json({ error: "product not found" });
  }
  res.json({ message: "product deleted successfully", data: deletedProduct });
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "wrong id is provided" });
  }
  const { name, price, description, quantity } = req.body;
  const updatedProduct = await productModel.findByIdAndUpdate(
    id,
    {
      name,
      price,
      description,
      quantity,
      $inc: { __v: 1 },
    },
    { new: true }
  );
  if (!updatedProduct) {
    return res.status(404).json({ error: "product not found" });
  }
  res.json({ message: "product deleted successfully", data: updatedProduct });
});

///////////////////////////////////////////////////////

app.get("/api/admin", async (req, res) => {
  const products = await allproductsModel.find();
  res.json(products);
});

app.post(
  "/api/admin",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        name,
        slug,
        price,
        description,
        isNew,
        features,
        includes,
        others,
        category,
      } = req.body;

      if (
        !name ||
        !slug ||
        !price ||
        !description ||
        !isNew ||
        !features ||
        !includes ||
        !others ||
        !category ||
        !req.files?.image ||
        !req.files?.image1 ||
        !req.files?.image2 ||
        !req.files?.image3
      ) {
        return res
          .status(400)
          .json({ error: "Please fill all required fields" });
      }

      let parsedIncludes;
      let parsedOthers;
      try {
        parsedIncludes = JSON.parse(includes);
        parsedOthers = JSON.parse(others);
      } catch {
        return res
          .status(400)
          .json({ error: "Invalid JSON format in includes or others" });
      }

      const priceNum = Number(price);
      if (isNaN(priceNum)) {
        return res.status(400).json({ error: "Price must be a number" });
      }

      const isNewBool = isNew === "true" || isNew === true;

      const productExists = await allproductsModel.findOne({ name });
      if (productExists) {
        return res.status(400).json({ error: "Such product already exists" });
      }

      const gallery = [
        req.files.image1[0].path,
        req.files.image2[0].path,
        req.files.image3[0].path,
      ];

      const createdProduct = await allproductsModel.create({
        name,
        slug,
        price: priceNum,
        description,
        isNew: isNewBool,
        features,
        includes: parsedIncludes,
        others: parsedOthers,
        category,
        image: req.files.image[0].path,
        gallery,
      });

      return res.status(201).json({
        message: "Product created successfully",
        product: createdProduct,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.get("/api/admin/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "wrong id is provided" });
  }
  const product = await allproductsModel.findById(id);
  if (!product) {
    return res.status(404).json({ error: "product not found" });
  }
  res.json(product);
});

app.delete("/api/admin/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "wrong id is provided" });
  }

  const deletedProduct = await allproductsModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    return res.status(404).json({ error: "product not found" });
  }
  res.json({ message: "product deleted successfully", data: deletedProduct });
});

app.put("/api/admin/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "wrong id is provided" });
  }
  const {
    name,
    slug,
    price,
    description,
    isNew,
    features,
    includes,
    others,
    category,
  } = req.body;
  const updatedProduct = await allproductsModel.findByIdAndUpdate(
    id,
    {
      name,
      slug,
      price,
      description,
      isNew,
      features,
      includes,
      others,
      category,
      $inc: { __v: 1 },
    },
    { new: true }
  );
  if (!updatedProduct) {
    return res.status(404).json({ error: "product not found" });
  }
  res.json({ message: "product deleted successfully", data: updatedProduct });
});

app.listen(4000, () => {
  console.log("running on http://localhost:4000");
});
