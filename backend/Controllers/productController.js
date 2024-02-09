const {Product} = require("../models/productModel");
const ErrorHandler=require("../utils/errorhandler");
const catchasyncerror=require("../middleware/catchasyncerror");
const ApiFeatures = require("../utils/apifeatures");
const error = require("../middleware/error");


exports.createproduct=async(req,res,next)=>{


    const product=await Product.create(req.body);


    res.status(201).json({
        success:true,
        product
    })
}
exports.getAllProducts=catchasyncerror(async(req,res)=>{

    const resultPerPage = 5;
    const productCount =await Product.countDocuments();
   

   const apiFeature =new ApiFeatures(Product.find(),req.query).search().Filter().pagination(resultPerPage);
  const products=await apiFeature.query;
  console.log(products)
  console.log('hii')

    res.status(200).json({
        success:true,
        products,
        productCount
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

exports.getProductReviews = catchasyncerror(async(req,res,next)=>{

      const product =Product.findById(req.query.id);

      if(!product){
        return next(new ErrorHandler("Product not found",404));
      }

      res.status(200).json({
        success:true,
        reviews:product.reviews,
      });

});
exports.deleteReview = catchasyncerror(async(req,res,next)=>{

    const product = Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    const reviews = product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString());
    let sum=0;
    
         reviews.forEach(rev=>{
            sum+=rev.rating; 
            
        })
    
        const ratings = sum/reviews.length;

        const numofReviews = reviews.length;

        await product.findByIdAndUpdate(req.query.productid,{
            reviews,
            ratings,
            numofReviews,
        },{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })

    res.status(200).json({
        success:true,

    });
});
