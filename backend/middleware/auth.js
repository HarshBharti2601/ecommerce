const ErrorHandler=require("../utils/errorhandler");
const jwt=require("jsonwebtoken");
const catchasyncerror = require("./catchasyncerror");
const User=require("../models/usermodel");



exports.isAuthenticatedUser=catchasyncerror(async(req,res,next)=>{

    const {token}=req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to "))
    }
  const decodedData=jwt.verify(token,process.env.JWT_SECRET)

  req.user=await User.findByid(decodedData.id);

  next();
});