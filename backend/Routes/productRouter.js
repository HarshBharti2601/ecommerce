const express=require("express");
const catchasyncerror = require("../middleware/catchasyncerror");
const { getAllProducts,createproduct, updateProduct, deleteproduct, getproduct, createProductReview, getProductReviews, deleteReview } = require("../Controllers/productController");
const {authorizeroles, isAuthenticatedUser}=require("../middleware/auth");

const router=express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products/new").post(isAuthenticatedUser,authorizeroles("admin"),catchasyncerror(exports.createproduct));
router.route("/admin/products/:ids").delete(isAuthenticatedUser,authorizeroles("admin"),deleteproduct).get(getproduct);

router.put("/products/:id",isAuthenticatedUser,authorizeroles("admin"),(req,res)=>{
    const productId=req.params.id;
    const updatedProductData=req.body;
    res.json({
        message:`product with Id ${productId} updated successfully`,
        product
    });
})

router.route("/reviews").get(getProductReviews);

router.route("/reviews").delete(isAuthenticatedUser,deleteReview);



module.exports=router;