const express=require("express");
const { getAllProducts,createproduct, updateProduct, deleteproduct, getproduct } = require("../Controllers/productController");

const router=express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createproduct);
router.route("/products/:id").delete(deleteproduct).get(getproduct);

router.put("/products/:id",(req,res)=>{
    const productId=req.params.id;
    const updatedProductData=req.body;
    res.json({
        message:`product with Id ${productId} updated successfully`,
        product
    });
})

module.exports = router;



module.exports=router;