const express=require("express");
const jwt=require('jsonwebtoken')
const Task = require("../Model/task.model");

const taskRouter=express.Router()

taskRouter.post("/add", async(req, res)=>{
    const token=req.headers.authorization;
    const decoded = jwt.verify(token, 'vinay');
    let payload=req.body;
    try{
        if(decoded){
            let task=new Task(payload);
            await task.save()
            res.status(200).send({msg:"success"})
        }else{
            res.status(500).send({msg:" Please login first"})
        }

    }catch(err){
        res.status(500).send(err)
    }
})

taskRouter.get("/get", async(req,res)=>{
    const token=req.headers.authorization;
    const decoded = jwt.verify(token, 'vinay');
    try{
        if(decoded){
            let task=await Task.find({userID:decoded.userID})
            res.status(200).send(task)
        }else{
            res.status(500).send("Please login first")
        }

    }catch(err){
        res.status(500).send(err)
    }

})

module.exports={taskRouter}