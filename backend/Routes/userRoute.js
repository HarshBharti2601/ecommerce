const express=require('express');
const { registeruser } = require('../Controllers/userController');
const router=express.Router();

router.route("/register").post(registeruser);
router.route("/login").post(loginUser);


module.exports=router;