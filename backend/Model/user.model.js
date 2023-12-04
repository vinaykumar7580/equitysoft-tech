const mongoose=require("mongoose")

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    }
},{
    versionKey:false
})

const User=mongoose.model("User", userSchema)

module.exports=User;