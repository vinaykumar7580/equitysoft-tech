const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const User = require("../Model/user.model")

const userRouter=express.Router()

userRouter.post("/register", async(req, res)=>{
    const {name, email, password}=req.body;

    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(hash){
               let user=new User({name, email, password:hash})
               await user.save()
               res.status(200).send({msg:"success"})
            }else{
                res.status(500).send({msg:"failed"})
            }
            
        });

    }catch(err){
        res.status(500).send("user register failed")
    }
})

userRouter.post("/login", async(req, res)=>{
    const {email, password}=req.body;

    let user=await User.findOne({email})

    try{
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                if(result){
                    let token = jwt.sign({ userID:user._id}, 'vinay');
                    res.status(200).send({msg:"success", token})
                }else{
                    res.status(500).send({msg:"failed"})
                }
            });

        }
        

    }catch(err){
        res.status(500).send("user login failed")
    }
})

userRouter.get("/users", async(req, res)=>{
    try{
        let user=await User.find();
        res.status(200).send(user)

    }catch(err){
        res.status(500).send("User Not Found.")
    }
})

module.exports={userRouter}