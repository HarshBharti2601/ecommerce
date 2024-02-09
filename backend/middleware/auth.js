const ErrorHandler=require("../utils/errorhandler");
const jwt=require("jsonwebtoken");
const catchasyncerror = require("./catchasyncerror");
const User=require("../models/usermodel");



exports.isAuthenticatedUser=catchasyncerror(async(req,res,next)=>{

    const {token}=req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to the page"))
    }
  const decodedData=jwt.verify(token,process.env.JWT_SECRET)

  req.user=await User.findById(decodedData.id);
 
  next();
});

exports.authorizeroles = (...roles)=>{
    return (req,res,next)=>{

        if(!roles.includes(req.user.role)){
        return next( new ErrorHandler(`role: ${req.user.role} is not allowed to access this resource`,403));
        };
        next();
    };
};