const express=require('express');
const { registeruser, forgotPassword,loginUser,logout,resetPassword } = require('../Controllers/userController');
const router=express.Router();

router.route("/register").post(registeruser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);


module.exports=router;