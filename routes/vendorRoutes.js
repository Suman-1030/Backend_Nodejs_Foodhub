const Vendorroute=require("../controllers/Vendorcontroller")
const express=require("express")
const router= express.Router()


router.post("/Register",Vendorroute.vendorRegistration)
router.post('/Login',Vendorroute.vendorLogin)
router.get("/Vendor-Rec",Vendorroute.VendorRecords)
router.get("/single-Rec/:id", Vendorroute.SingleRecords);






module.exports=router