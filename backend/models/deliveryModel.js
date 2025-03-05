const mongoose = require("mongoose");

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

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
