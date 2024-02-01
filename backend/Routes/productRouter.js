const express=require("express");
const { getAllProducts,createproduct, updateProduct, deleteproduct, getproduct } = require("../Controllers/productController");

const router=express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createproduct);
router.route("/products/:id").put(updateProduct).delete(deleteproduct).get(getproduct);


module.exports=router;