const ErrorHandler=require("../utils/errorhandler");
const catchasyncerror=require("../middleware/catchasyncerror");
const User=require("../models/usermodel");
const sendToken = require("../utils/jwtToken");


exports.registeruser=catchasyncerror(async(req,res,next)=>{
    const {name,email,password}=req.body;

    const user =await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicUrl",
        },
    });
const token=user.getJWTToken();

sendToken(user,201,res)


});

exports.loginuser=catchasyncerror(async(req,res,next)=>{

    const {email,password}= req.body;

    if(!email||!password){
        return next(new ErrorHandler("Please enter"))
    }

    const user=await User.findOne({email}).select("+password")

    if(!user){
       return next(new ErrorHandler("Invalid email or password")) 
    }

    const isPasswordMatched = user.comparePassword();

    if(!isPasswordMatched ){
        return next(new ErrorHandler("Invalid email or password")) 
     }

     sendToken(user,200,res)
     
     });

     exports.logout =catchasyncerror(async(req,res,next)=>
      
       res.cookie("token",null,{
        expires:new Date(Date.now()),
        httponly:true
       })
     )

     res.status(200).json({
        success:true,
        message:"logged out"
     });
     
     
     
