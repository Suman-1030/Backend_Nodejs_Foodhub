// controllers/paymentController.js
const Razorpay = require("razorpay");
const Order = require('../models/Order')

const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret
});

exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay accepts amount in paise
      currency: "INR",
      receipt: "order_rcptid_" + Math.random().toString(36).substring(7)
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ error: "Razorpay order creation failed" });
  }
};

exports.updateStatus = async (req, res) => {
    const userId = req.params.id;
    try {
      const order = await Order.findOne({ user: userId }).sort({ createdAt: -1 });
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Update payment status
      order.paymentStatus = 'paid';
      await order.save();
  
      res.status(200).json({ message: "Payment status updated to 'paid'" });
    } catch (error) {
      console.error("Error updating payment status:", error);
      res.status(500).json({ error: "Failed to update payment status" });
    }
  };