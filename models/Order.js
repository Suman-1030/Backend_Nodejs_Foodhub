// models/Order.js
const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        
        required: true
      }
    }
  ],

  firm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Firm",
    required: false
  },

  totalPrice: {
    type: Number,
    required: true
  },
  userDetails: {
    fullName: { type: String, required: true },
    email: { type: String }, // optional
    phone: { type: String, required: true }
  },

  address: {
    
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, default: 'india' }
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  deliveryStatus: {
    type: String,
    enum: ["processing", "shipped", "delivered", "cancelled"],
    default: "processing"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
