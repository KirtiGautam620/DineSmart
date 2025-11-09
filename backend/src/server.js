const express=require('express')
const dotenv=require("dotenv")
const cron=require("./cron")
const axios=require("axios")
const app=express()
const { PrismaClient } = require('@prisma/client')
const prisma=new PrismaClient()
const PORT=process.env.PORT || 5001
dotenv.config()
app.use(express.json())
app.get("/api/test", (req,res)=>{
    res.status(200).json({success:true})
})
app.post("/api/favorites",async (req,res)=>{
    try{
        const {userId,recipeId,title,image,cookTime,servings}=req.body
        if(!userId||!recipeId||!title){
            return res.status(400).json({error:"missing required fields"})
        }
        const fav=await prisma.favorites.create({
            data:{
                userId,recipeId,title,image,cookTime,servings
            }
        })
        res.status(201).json({success:true,fav})

    }catch(err){
        console.log(err)
        res.status(500).json({error:"server error"})
    }
})
app.delete("/api/favorites/:userId/:recipeId",async(req,res)=>{
    try{
        const {userId,recipeId}=req.params
        const del=await prisma.favorites.deleteMany({
            where:{
                userId:parseInt(userId),
                recipeId:parseInt(recipeId)
            }
        })
        res.status(200).json({del})
    }catch(err){
        console.log(err)
    }

})
app.get("/api/favorites/:userId",async (req,res)=>{
    try{
        const {userId}=req.params
        const user=await prisma.favorites.findMany({
            where:{
            userId:parseInt(userId)}
        })
        res.status(200).json({user})
    }
    catch(err){
        console.log(err)
    }
})

app.listen(PORT,()=>{
    console.log("server is running on port ",PORT)
})