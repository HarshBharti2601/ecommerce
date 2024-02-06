const express=require("express");
const { getAllProducts,createproduct, updateProduct, deleteproduct, getproduct } = require("../Controllers/productController");
const {isAuntheticatedUser,authorizeroles}=require("../middleware/auth");

const router=express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(isAuntheticatedUser,authorizeroles("admin"),createproduct);
router.route("/products/:id").delete(isAuntheticatedUser,authorizeroles("admin"),deleteproduct).get(getproduct);

router.put("/products/:id",isAuntheticatedUser,authorizeroles("admin"),(req,res)=>{
    const productId=req.params.id;
    const updatedProductData=req.body;
    res.json({
        message:`product with Id ${productId} updated successfully`,
        product
    });
})

module.exports = router;



module.exports=router;