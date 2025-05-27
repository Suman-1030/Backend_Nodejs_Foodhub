const express = require("express");
const router = express.Router();
const Cartcon=require('../controllers/Cartcontroller')

router.post("/add-Cart",  Cartcon.addToCart);
router.delete("/Del-Cart", Cartcon.removeFromCart)
router.get("/get-Carts", Cartcon.CartRecords)
router.post("/get-Usercart/:id", Cartcon.SingleCartRecord)
router.put("/Firm-null/:id", Cartcon.UpdateFirmCart)



module.exports = router; 