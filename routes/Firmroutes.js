const express = require("express");
const Firmcontroller = require("../controllers/Firmcontroller"); 
const router = express.Router();
const VerifyToken = require("../middlewears/VerifyToken"); 


router.post("/add-firm", VerifyToken, Firmcontroller.addFirm);

module.exports = router; 