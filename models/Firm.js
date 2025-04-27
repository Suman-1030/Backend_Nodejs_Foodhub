const mongoose=require("mongoose")
const firmSchema=new mongoose.Schema({

    Firmname:{
        type:String,
        required:true,
        unique:true
    },
    Area:{
        type: String,
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
     Region:{
        type:[
            {
                type:String,
                enum:["South-indian","North-indian","Chinese","Bekery"]
            }
        ]
     },
     Offer:{
        type: String,
        
    },
     image:{
        type:String
     },
     vendor:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Vendor'
        }
     ],

     products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
     ]


})

const Firm=mongoose.model('Firm',firmSchema)
module.exports= Firm
