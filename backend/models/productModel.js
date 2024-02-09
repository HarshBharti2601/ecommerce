const mongoose=require("mongoose");


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add the product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please add the product description"]
     },
     price:{
        type:Number,
        required:[true,"Please add the price of the product"],
        maxLength:[8,"price is out of range"]
     },
     ratings:{
        type:Number,
        default:0
     },
     images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
     }],
     stock:{
        type:Number,
        required:true,
        maxLength:[4,"too much"],
        default:1
     } ,
     numofReviews:{
        type:Number,
        default:0
     } ,
     reviews:[{
       name:{
        type:String,
        required:true
       },
       rating:{
        type:Number,
        required:true
       },
       comment:{
        type:String,
        required:true
       }
     } 
    ],
    createdAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }
});




const Product = mongoose.model('Product',productSchema);

module.exports = {Product};