const router = require("express").Router();
const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const isAuth = require("../middlewares/isAuth");

router.post("/", isAuth, async (req, res) => {
  const userId = req.userId;

  const cart = await Cart.findOne({ userId });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        orders: {
          items: cart.items,
          total: total,
          createdAt: new Date(),
        },
      },
    },
    { new: true }
  );

  await Cart.findOneAndDelete({ userId });

  res.status(201).json({ message: "Order placed", orders: updatedUser.orders });
});

module.exports = router;
