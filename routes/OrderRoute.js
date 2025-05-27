
const express = require("express");
const router = express.Router();
const OrderController=require('../controllers/Order')

router.post("/Order-Pr/:id", OrderController.SetOrder);

module.exports = router; 