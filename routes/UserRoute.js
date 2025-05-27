const Userroute=require("../controllers/Usercontroller")
const express=require("express")
const router= express.Router()


router.post("/Register",Userroute.UserRegistration)
router.post('/Login',Userroute.UserLogin)






module.exports=router