const express = require("express")
const app = express()
require("./databases/config")
const user =  require("./databases/users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const secretKey = "7007"
const path = require("path")
const port = 3300

app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))

function verify(req,res,next){
    const headers =req.headers.authorization
    const authUser = headers.split(" ")[1]
    jwt.verify(authUser,secretKey,(err,decoded)=>{
        if(err){
            res.json({error:"Invalid token"})
        }
        req.user = decoded
        next()
    })
    
}

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})

app.post("/",async(req,res)=>{
    const {username,password} = req.body
    const userInfo = await user.findOne({username:username})
    const compareResult = await bcrypt.compare(password,userInfo.password)
    if(!userInfo|| !compareResult){
        res.json({error:"Not found"})
    }
    console.log(compareResult)
})

app.post("/index.html",async(req,res)=>{
    const {username,password} = req.body
    const userInfo = await user.findOne({username:username})
    const compareResult = await bcrypt.compare(password,userInfo.password)
    const payload = ({
        userId : userInfo._id,
        username : userInfo.username,
    })
    const token= jwt.sign(payload,secretKey,{expiresIn:"24h"})
    if(!userInfo|| !compareResult){
        return res.status(400).json({err:"Not found"})
    }
   res.json({token:token})
    console.log(compareResult)
    
})

app.post("/signup.html",async(req,res)=>{
    const {username,password} = req.body
    const hashPass = await bcrypt.hash(password,13)
    const newUser = new user({
        username,
        password:hashPass
    })
    const saved = await newUser.save()
    console.log(saved)
    res.sendFile(path.join(__dirname,"public","index.html"))
})

app.get("home.html",verify,(req,res)=>{
    res.sendFile(path.join(__dirname,"public","home.html"))
})

app.listen(port,()=>{
   console.log("Server is running...")
})
