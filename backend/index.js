const express=require("express")
const cors=require("cors")
const { connection } = require("./db")
const { userRouter } = require("./Routes/user.routes")
const { taskRouter } = require("./Routes/task.routes")
const { auth } = require("./Middleware/auth")
const { memberRouter } = require("./Routes/member.routes")


const app=express()
app.use(express.json())
app.use(cors())

app.use("/app", userRouter)
app.use("/member", memberRouter)

app.use(auth)
app.use("/task", taskRouter)

app.listen(8000, async()=>{
    try{
        await connection
        console.log("MongoDB database connected")

    }catch(err){
        console.log(err)
        console.log("MongoDB database not connected")
    }
})