mongoose=require("mongoose")
const VendorSchema= new mongoose.Schema({

    Username:{
        type:String,
        required:true
        
    },

    Email:{
        type:String,
        required:true,
        unique:true
    },

    Password:{
        type:String,
        required:true
       
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Firm"
        }
    ]

});

const Vendor= mongoose.model("Vendor",VendorSchema)
module.exports=Vendor;