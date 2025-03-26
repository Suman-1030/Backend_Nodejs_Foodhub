const Product = require("../models/Product");
const multer = require("multer");
const Firm = require('../models/Firm')
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addProduct = async(req, res) => {
    try {
        const { Productname, Price, Category, Bestseller, Description } = req.body;
        const image = req.file ? req.file.filename : undefined;

        console.log("🔥 Request Body:", req.body);
        const firmId = req.params.id;
        console.log(firmId)
        const firm = await Firm.findById(firmId);
        

        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const product = new Product({
            Productname,
            Price,
            Category,
            Bestseller,
            Description,
            image,
            firm: firm._id
        })
        
        const savedProduct = await product.save();
        firm.products.push(savedProduct);


        await firm.save()

        res.status(200).json(savedProduct)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}


const Getproducts=async (req,res)=>{
     const Firmid=req.params.id
     try{
         const firm= await Firm.findById(Firmid)

         if(!firm){
            return res.status(500).json({err:"firm not found"})
         }
         const products= await Product.find({firm:Firmid})
         res.status(202).json({products})

     }
     catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
     }
}

const Deleteproduct=async (req,res)=>{
    try{
         const Productid=req.params.id
         const deletedproduct=await Product.findByIdAndDelete(Productid)
         if(!deletedproduct){
            return res.status(500).json("product not found")
         }
         res.status(202).json("product deleted successfully")
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}












module.exports={addProduct:[upload.single('image'),addProduct],Getproducts,Deleteproduct}
