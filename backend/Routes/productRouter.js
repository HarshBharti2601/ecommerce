const express=require("express");
const { getAllProducts,createproduct } = require("../Controllers/productController");

const router=express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createproduct);
router.route("/products/:id").post(update);

module.exports=router;