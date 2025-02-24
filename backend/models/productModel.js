const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    image_url: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const deliverySchema = mongoose.Schema({
  deliveryAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  deliveryStatus: {
    type: String,
    enum: ["pending", "dispatched", "in transit", "delivered", "canceled"],
    default: "pending",
  },
  courier: { type: String },
  trackingNumber: { type: String },
  estimatedDeliveryDate: { type: Date },
  deliveredAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

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
  image_url: {
    type: String,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  category_id: {
    type: String,
  },
  option1_name: {
    type: String,
  },
  option2_name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "unisex"],
  },
  color: {
    type: String,
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
  reviews: [reviewSchema],
  category: [categorySchema],
  delivery: [deliverySchema],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
