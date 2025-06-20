const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },
    category: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
