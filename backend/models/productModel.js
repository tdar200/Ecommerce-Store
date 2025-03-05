const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  item_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  currency: {
    type: String,
    enum: ["gbp", "pkr"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "unisex"],
  },
  purchase_price: {
    type: Number,
    required: true,
  },
  selling_price: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  color: [{ name: { type: String }, value: { type: String } }],
  category: {
    type: String,
    enum: [
      "apparel",
      "accessories",
      "beauty",
      "health & fitness",
      "electronics",
    ],
  },
  brand: {
    type: String,
    enum: ["levis"],
  },
  size: {
    type: String,
    enum: ["extra small", "small", "medium", "large", "extra large"],
  },
  delivery: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Delivery",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
