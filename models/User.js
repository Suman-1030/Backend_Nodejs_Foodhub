mongoose=require("mongoose")
const UserSchema= new mongoose.Schema({

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
       
    }
    

});

const user= mongoose.model("User",UserSchema)
module.exports=user;