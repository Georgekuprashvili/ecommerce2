const { Router } = require("express");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const userModel = require("../models/user.model");

const adminRouter = Router();

adminRouter.get("/users", isAuth, isAdmin, async (req, res) => {
  const users = await userModel.find().select("-password");
  res.json(users);
});

module.exports = adminRouter;
