const express=require('express')
const router=express.Router()
const productcon=require('../controllers/Productcontroller')


router.post("/add-pr/:id",productcon.addProduct)
router.get("/getprs/:id",productcon.Getproducts)
router.delete("/Delpr/:id",productcon.Deleteproduct)
router.post("/Singleproduct/:id",productcon.Singleproduct)
router.get('/getbyname/:name',productcon.ProductByName)

router.get("/uploads/:imageName",(req,res)=>{
    const imageName=req.params.imageName
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
})
module.exports=router