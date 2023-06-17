import {User} from "../models/user.js";
import bcrypt from "bcrypt"; 
import jwt from 'jsonwebtoken';
import { sendCookie } from "../utils/feature.js";


export const getAllUsers=async(req,res)=>{ 
}; 

export const register=async(req,res)=>{ 
    try {
        const {name,email,password}=req.body; 
    let user=await User.findOne({email});
    if(user) {
    return res.status(404).json({
    success:false,
    message:"User already exist"});
    }else{
    const hashedPassword=await bcrypt.hash(password,10);
    user=await User.create({name,email,password:hashedPassword});
    sendCookie(user,res,"Registered Sucessfully",201);
    }
    } catch (error) {
        next(error);
    }
};  

export const login=async(req,res)=>{ 
    try {
        const {email,password}=req.body;
const user=await User.findOne({email}).select("+password");
if (!user) {
    return res.status(404).json({
    success:false,
    message:"invalid email"});
    } 
const isMatched=await bcrypt.compare(password,user.password);
if (!isMatched) {
    return res.status(404).json({

        success:false,
        message:"invalid password"});
    }else{
    sendCookie(user,res,`welcome back ${user.name}`,200);
}
    } catch (error) {
        next(error);
    }
};

export const getMyProfile=async(req,res)=>{  
   try {
    res.status(200).json({
        success:true,
        user:req.user
    })
   } catch (error) {
    next(error)
   }
}; 

export const logout=(req,res)=>{ 
    res.status(200).cookie("token","",{expires:new Date( Date.now()),
        sameSite:process.env.NODE_ENV==="DEVELOPMENT"?"lax":"none",
        secure:process.env.NODE_ENV==="DEVELOPMENT"? false:true}).json({
        success:true,
        users:req.user
    })

};


