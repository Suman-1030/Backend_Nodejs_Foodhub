const Vendor = require("../models/Vendor");
const Firm=require("../models/Firm")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const redisClient = require('../redis');
const { json } = require("body-parser");



dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    console.error("SECRET_KEY is not defined in environment variables.");
    process.exit(1);
}

const vendorRegistration = async (req, res) => {
    const { Username, Email, Password } = req.body;

    try {
        const vendorEmail = await Vendor.findOne({ Email: Email.trim() });
        if (vendorEmail) {
            return res.status(400).json("Email already taken");
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const newVendor = new Vendor({
            Username,
            Email: Email.trim(),
            Password: hashedPassword
        });

        await newVendor.save();
        res.status(201).json({ message: "Vendor registered successfully" });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ msg: "Internal error" });
    }
};

const vendorLogin = async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const vendor = await Vendor.findOne({ Email: Email.trim() })
        if (!vendor) {
            return res.status(404).json("Vendor not found");
        }

        const isMatch = await bcrypt.compare(Password, vendor.Password);
        if (!isMatch) {
            return res.status(400).json("Invalid password");
        }

        const VendorId=vendor._id
        

        const token = jwt.sign({ vendor_id: vendor._id }, SECRET_KEY, { expiresIn: "1h" });

        console.log("Your token is:", token);
        res.status(200).json({ msg: "You are logged in successfully", token,VendorId});

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal error" });
    }
};
    


const exp= 3600;
const VendorRecords=async (req,res)=>{
   
    try{  
        const Catchkey='vendors'
        const Catched= await redisClient.get(Catchkey)
        if(Catched){
           console.log('From Cache') 
           return res.json({vendors:JSON.parse(Catched)})
        }
        const vendors= await Vendor.find().populate('firm')
        await redisClient.setEx(Catchkey,exp,JSON.stringify(vendors))
        console.log('From MongoDB')
        res.json({vendors})
    }
    catch(error){
        console.log("error",error)
        res.status(500).json({err:"error found"})
    }
      
}

const SingleRecords=async (req,res)=>{
      const Vendorid=req.params.id
    try{
        const vendor=await Vendor.findById(Vendorid).populate('firm')
        if(!vendor){
            res.json("vendor not found")

        }
        res.json({vendor})
    }
    catch(err){
        console.log(err)
        res.json("error")
    }
}

module.exports = { vendorRegistration, vendorLogin ,VendorRecords,SingleRecords};
