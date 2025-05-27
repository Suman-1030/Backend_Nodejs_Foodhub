const Product = require('../models/Product');
const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
  const { UserId, ProductId, quantity } = req.body;

  try {
    const product = await Product.findById(ProductId).populate('firm');

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const firmFromProduct = Array.isArray(product.firm)
      ? product.firm[0]._id || product.firm[0]
      : product.firm._id || product.firm;

    let cart = await Cart.findOne({ user: UserId }).populate('items.product');

    // 🔴 If cart doesn't exist, create new one
    if (!cart) {
      const newCart = new Cart({
        user: UserId,
        items: [{
          product: product._id,
          quantity,
          price: parseFloat(product.Price),
        }],
        firm: firmFromProduct,
        totalPrice: parseFloat(product.Price) * quantity,
      });

      await newCart.save();
      return res.status(201).json({ msg: 'Cart created', cart: newCart });
    }

    // 🟡 If firm is null, assign current product's firm
    if (!cart.firm) {
      cart.firm = firmFromProduct;
      await cart.save();
    }

    // ⛔ If cart's firm does not match product's firm
    if (String(cart.firm) !== String(firmFromProduct)) {
      return res.status(400).json({ msg: 'Products from different restaurants cannot be added to the cart' });
    }

    // ✅ Check if product already exists in the cart
    const existingItem = cart.items.find(
      (item) => String(item.product._id) === ProductId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity,
        price: parseFloat(product.Price),
      });
    }

    // ✅ Update total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({ message: 'Product added to cart', cart });

  } catch (error) {
    console.error("🛑 Add to cart error:", error.message, error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const removeFromCart = async (req, res) => {
  const { UserId, ProductId } = req.body;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ user: UserId }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the product to remove it
    const updatedItems = cart.items.filter(
      item => String(item.product._id) !== String(ProductId)
    );

    // If product wasn't in the cart
    if (updatedItems.length === cart.items.length) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update cart items
    cart.items = updatedItems;

    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({ message: 'Product removed from cart', cart });

  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const CartRecords=async (req,res)=>{
  try{
      const cartrec= await Cart.find().populate('items')
      res.status(200).json({msg:"Carts Received successfully",cartrec})
  }
  catch(error){
     console.log(error)
     res.status(500).json({msg:"internal error"})
  }
}

const SingleCartRecord=async (req,res)=>{
     const userId=req.params.id
  try{
      const cartrec= await Cart.findOne({user:userId}).populate('items')
      console.log("REsponse",cartrec)
      if(!cartrec){
         return res.status(400).json({msg:"Carts not received"})
      }
      res.status(200).json({msg:"Carts Received successfully",cartrec})
  }
  catch(error){
     console.log(error)
      return res.status(500).json({msg:"internal error"})
  }
}

const UpdateFirmCart = async (req, res) => {
  const UserId = req.params.id;

  try {
    const cart = await Cart.findOne({ user: UserId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    // Check if cart is empty and firm is not already null
    if (cart.items.length === 0 && cart.totalPrice === 0 && cart.firm !== null) {
      cart.firm = null;
      await cart.save();
      return res.status(200).json({ msg: "Firm removed from cart", cart });
    }

    return res.status(200).json({ msg: "No update needed", cart });

  } catch (error) {
    console.error("UpdateFirmCart error:", error.message);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};



module.exports = { addToCart,removeFromCart,CartRecords,SingleCartRecord,UpdateFirmCart };
