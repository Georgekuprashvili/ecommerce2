const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const isAuth = require("../middlewares/isAuth");
require("dotenv").config();

const authRouter = Router();

authRouter.post("/sign-up", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  const existingUser = await userModel.findOne({ email: email.toLowerCase() });
  if (existingUser)
    return res.status(400).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.create({
    fullName,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  res.status(201).json({ message: "User created successfully" });
});

authRouter.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "fields ara requred" });

  const existUser = await userModel
    .findOne({ email: email.toLowerCase() })
    .select("email password");
  if (!existUser) {
    return res.status(400).json({ error: "email or pasword is incorrect" });
  }

  const isPassEqual = await bcrypt.compare(password, existUser.password);
  if (!isPassEqual) {
    return res.status(400).json({ error: "email or pasword is incorrect" });
  }

  const payLoad = {
    userId: existUser._id,
  };

  const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ accessToken, email: existUser.email });
});

authRouter.get("/current-user", isAuth, async (req, res) => {
  const user = await userModel.findById(req.userId).select("-password");

  res.json(user);
});

module.exports = authRouter;
