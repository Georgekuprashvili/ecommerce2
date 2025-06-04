const mongoose = require("mongoose");

const includesSchema = new mongoose.Schema({
  quantity: {
    type: Number,
  },
  item: {
    type: String,
  },
});
const othersSchema = new mongoose.Schema({
  slug: {
    type: String,
  },
  name: {
    type: String,
  },
});

const allProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
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
    isNew: {
      type: Boolean,
    },
    features: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    gallery: [String],
    includes: [includesSchema],
    others: [othersSchema],
  },

  { timestamps: true }
);

module.exports = mongoose.model("allproduct", allProductsSchema);
