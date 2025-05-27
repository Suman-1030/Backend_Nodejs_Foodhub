const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
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
        min: 1,
        default: 1
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
    required: false // Enforces single-restaurant-per-cart behavior
  },

  totalPrice: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
