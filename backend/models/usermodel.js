const mongoose=require("mongoose");
const validator =require("validator");
const bcryptjs=require("bcryptjs");
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
            type:string,
            required:true
        }
    },
    role:{
        type:string,
        default:"user"
    },
    resetPasswordToken:string,
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


user.Schema.methods.comparePassword =async function
(enteredPassword)
{
return await bcrypt.comparePassword(enteredPassword,this.password);
}
module.exports= mongoose.model("user",userSchema);