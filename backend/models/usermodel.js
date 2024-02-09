const mongoose=require("mongoose");
const validator =require("validator");
const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxlength:[30,"Name cannot exceed 30 characters"],
        minlength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minlength:[8,"Password should be greater than eight characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

});

userSchema.pre("save",async function(next){

    if(!this.isModified('password')){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
});

userSchema.methods.getJWTToken =function(){
    return jwt.sign({id:this._id},process.env.JWT_secret,
        {
            expiresIn:process.env.JWT_EXPIRE
        });
};


userSchema.methods.comparePassword =async function
(enteredPassword)
{
return await bcrypt.comparePassword(enteredPassword,this.password);
};

userSchema.methods.getResetPasswordToken =function(){
    const resetToken=crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken =crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*100;

    return resetToken;

};



module.exports= mongoose.model("user",userSchema);