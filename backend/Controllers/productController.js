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

    const resultPerPage = 5;
    const productCount =await Product.counntDocuments();

   const apiFeature =new  ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
  const products=await Product.find();

    res.status(200).json({
        success:true,
        products,
        PproductCount
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
exports.createProductReview =catchasyncerror(async(req,res,next)=>{
   
    const {rating,comment,productId} = req.body;
   
   
    const review ={
        user:req.user.id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    };

    const product = await Product.findById(productId);
     
    const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user._id.toString())
    if(isReviewed){
       product.reviews.forEach(rev=>{
        if(rev=>rev.user.toString()===req.user._id.toString()){
            rev.rating=rating,
            rev.comment=comment
        }
       })
    }
    else{
        product.reviews.push(review);
        product.numofReviews=product.reviews.length
    }
    let avg=0;
    product.ratings = product.reviews.forEach(rev=>{
        avg+=rev.rating; 
    })
})