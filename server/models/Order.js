const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "preparing",
  },
  priority: {
    type: Boolean,
    required: true,
    default: false,
  },
  cart: [
    {
      pizzaId: { type: Number, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  id: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  estimatedDelivery: { type: Date, required: true },
  orderPrice: { type: Number, required: true },
  priorityPrice: {
    type: Number,
    default: 0,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
