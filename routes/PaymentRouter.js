// routes/payment.js
const express = require('express');
const router = express.Router();
const { createRazorpayOrder,updateStatus } = require('../controllers/PaymentController');

router.post('/create-order', createRazorpayOrder);
router.put('/paymentUpdate/:id',updateStatus)

module.exports = router;
