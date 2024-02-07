const ErrorHandler=require("../utils/errorhandler");
const catchasyncerror=require("../middleware/catchasyncerror");
const User=require("../models/usermodel");
const sendToken = require("../utils/jwtToken");
const sendEmail=require("../utils/sendemail");

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
        return next(new ErrorHandler("Please enter correct email or password"))
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
       
     exports.forgotPassword = catchasyncerror(async(req,res,next)=>{

        const user = await user.findOne({email:req.body.email});

        if(!user){
            return next(new ErrorHandler("User not found",404));
        }
            const resetToken = user.getResetPasswordToken();

            await user.save({validateBeforeSave:false});

            const resetPasswordUrl =`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}` ;

            const message=`Your password reset token is :-\n\n ${resetPasswordUrl} \n\n if you have not requested this email
            then please ignore it`;


            try {

                await sendEmail({
                    email:user.email,
                    subject:`Ecommerce Password Recovery`,
                    message
                });

                res.status(200).json({
                    success:true,
                    message:`Email sent to ${user.email} successfully`

                })

            } catch(error){
                 user.resetPasswordToken =undefined;
                 user.resetPasswordExpire =undefined;

                 await user.save({ validateBeforeSave :false});

                 return next (new ErrorHandler(error.message ,500));


            }
        exports.resetPassword =catchasyncError(async(req,res,next)=>{

            const resetPasswordToken =crypto.createHash("sha256")
                   .update(req.params.token)
                   .digest("hex");



                   const user= await User.findOne({
                    resetPasswordToken,
                    resetPasswordExpire:{$gt :Date.now()},
                   });

             if(!user){
                return next(new ErrorHandler("Reset Password Token is Invalid or has been expired",404));
             } 
            if (req.body.password!== req.body.confirmPassword){
                return next(new ErrorHandler ("Password does not match",400));
            }
            
            user.password=req.body.password;
            user.resetPasswordToken =undefined;
            user.resetPasswordExpire =undefined;

           await user.save();

           sendToken(user,200,res);
        })
     });
     
     exports.getUserDetails = catchasyncerror(async(req,res,next)=>{


        const user = await User.findById(req.user.id);

        res.status(200).json({
            success:true,
            user
        })
     })
     
     exports.updateUserPassword = catchasyncerror(async(req,res,next)=>{


        const user = await User.findById(req.user.id).select("+password");

        const isPasswordMatched = user.comparePassword(req.body.oldPassword);

        if(!isPasswordMatched ){
            return next(new ErrorHandler("Old password is incorrect",400)); 
         }

         if(req.body.newPassword  !== req.body.confirmPassword){
            return next(new ErrorHandler("password does not match",400));
         }

         user.password=req.body.newPassword;

         await user.save();

         sendToken(user,200,res);

        
     })
     exports.updateUserProfile = catchasyncerror(async(req,res,next)=>{


        const newUserData={
            name:req.body.name,
            email:req.body.email,
        }


        const user= await User.findByIdAndUpdate(req.user.id,newUserData,{
           new:true,
           runValidators:true,
           useFindAndModify:false, 
        });

        res.status(200).json({
            success:true,
        });

        

        
     });

     exports.getAllUser = catchasyncerror(async(req,res,next)=>{
        const users = await User.findById(req.params.id);

       if(!users){
        return next(new ErrorHandler(`User does not exists with id: ${req.params.id}`))
       }


        res.status(200).json({
            success:true,
            users,
     })
     })
   
