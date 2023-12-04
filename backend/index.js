const express=require("express")
const cors=require("cors")
const { connection } = require("./db")
const { userRouter } = require("./Routes/user.routes")


const app=express()
app.use(express.json())
app.use(cors())

app.use("/app", userRouter)

app.listen(8000, async()=>{
    try{
        await connection
        console.log("MongoDB database connected")

    }catch(err){
        console.log(err)
        console.log("MongoDB database not connected")
    }
})