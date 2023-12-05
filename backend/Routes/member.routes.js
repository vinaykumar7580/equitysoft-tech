const express=require("express")
const Member = require("../Model/member.model")

const memberRouter=express.Router()

memberRouter.post("/add", async(req, res)=>{
    let payload=req.body
    try{
        let member=new Member(payload)
        await member.save()
        res.status(200).send({msg:"success"})

    }catch(err){
        res.status(500).send({msg:"failed"})
    }
})

module.exports={memberRouter}