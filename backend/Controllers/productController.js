const Product = require("../models/productModel");
const ErrorHandler=require("../utils/errorhandler");
const catchasyncerror=require("../middleware/catchasyncerror");
const ApiFeatures = require("../utils/apifeatures");


exports.createproduct=catchasyncerror(async(req,res,next)=>{


    const product=await Product.create(req.body);


    res.status(201).json({
        success:true,
        product
    });
});

exports.getAllProducts=catchasyncerror(async(req,res)=>{

   const apiFeature =new  ApiFeatures(Product.find(),req.query);
  const products=await Product.find();

    res.status(200).json({
        success:true,
        products
    })});

 exports.updateProduct=catchasyncerror(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404));
    }
    product=await product.findByIdandUpdate(req.params.id,req.body);



    re.status(200).json({
        success:true,
        product
    });
 }  
);
exports.deleteproduct=catchasyncerror(async(req,res,next)=>{
    const product=await product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found",404));
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product Deleted successfully" 
    })
});
exports.getproduct=catchasyncerror(async(req,res,next)=>{
    const product=await product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found",404));
    }
   
    res.status(200).json({
        success:true,
        product
    });
});