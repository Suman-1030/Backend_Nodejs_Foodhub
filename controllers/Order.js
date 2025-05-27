const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Firm = require('../models/Firm');

async function SetOrder(req, res) {
  const UserId = req.params.id;
  const {
    fullName,
    email,
    phone,
    street,
    city,
    state,
    country
  } = req.body; // Get userDetails and address from request body

  try {
    const cart = await Cart.findOne({ user: UserId }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.price
    }));

    const newOrder = new Order({
      user: UserId,
      items: orderItems,
      firm: cart.firm,// assuming single firm
      totalPrice: cart.totalPrice,
      userDetails: {
        fullName,
        email,
        phone
      },
      address: {
        street,
        city,
        state,
        country
      },
      paymentStatus: 'paid',
      deliveryStatus: 'processing'
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });

  } catch (error) {
   console.error('Order error:', error); // full error object
   res.status(500).json({
     message: 'Failed to place order',
     error: error.message,
     stack: error.stack, // optional, helps in dev/debug
     errors: error.errors || null // useful for Mongoose validation errors
   });
  }
}

module.exports = { SetOrder };
