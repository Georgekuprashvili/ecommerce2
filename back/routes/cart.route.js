const router = require("express").Router();
const Cart = require("../models/cart.model");
const isAuth = require("../middlewares/isAuth");

router.post("/", isAuth, async (req, res) => {
  const { items } = req.body;
  const userId = req.userId;

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { items },
    { upsert: true, new: true }
  );

  res.json(cart);
});

router.get("/", isAuth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.userId });
  res.json(cart || { items: [] });
});

module.exports = router;
