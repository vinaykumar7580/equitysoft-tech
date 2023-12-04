const mongoose=require("mongoose")


const memberSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Task"
        }
    ],
    role:String

},{
    versionKey:false
})

const Member=mongoose.model("Member", memberSchema)
module.exports=Member;