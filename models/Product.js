const mongoose =require("mongoose")

const ProductSchema=new mongoose.Schema({

  Productname:{
    type:String,
    required:true
  },
   
  Price:{
    type:String,
    required:true
  },

 Category:{
     type:[
        {
            type:String,
            enum:["Veg","Non-Veg"]
        }
     ]

 },
 image:{
    type:String,
   
 },
 Bestseller: {
  type: Boolean,
  default: false
}
,

 Discription:{
    type:String  
 },

  firm:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }
  ]

})


const product= mongoose.model('Product',ProductSchema)
module.exports=product