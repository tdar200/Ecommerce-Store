const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const colorSchema = mongoose.Schema({
  name: {
    type: String,
  },
  value: {
    type: String,
  },
});

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
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
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
  description: {
    type: String,
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
  color: [colorSchema],
  reviews: [reviewSchema],
  category: [categorySchema],
  delivery: [deliverySchema],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
