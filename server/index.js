const express = require("express")
const mongoose =require('mongoose')
const cors = require("cors")
const UserModel =require('./models/Users')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/Academix")
app.listen(3001,()=>{
    console.log("server is running")
})


app.post('/Users',(req,res)=>{
    UserModel.create(req.body)
    .then(teachers => res.json(teachers))
    .catch(err => res.json(err))
})

app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    UserModel.findOne({username:username})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json(user)
            }else{
                res.json('UnAthorised')
            }
        } else{
            res.json("UnAthorised")
        }
    })
})