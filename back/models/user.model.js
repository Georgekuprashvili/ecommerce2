const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true, select: false },
    orders: [
      {
        items: [
          {
            productId: String,
            name: String,
            price: Number,
            quantity: Number,
            image: String,
          },
        ],
        total: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
