const express=require('express');
const { registeruser, 
    forgotPassword,
    loginUser,
    logout,
    resetPassword, 
    getUserDetails, 
    updateUserPassword,
     updateUserProfile,
     getAllUser
     } = require('../Controllers/userController');
const { isAuthenticatedUser, authorizeroles } = require('../middleware/auth');
const router=express.Router();

router.route("/register").post(registeruser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);

router.route("/me").get( isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser,updateUserPassword);

router.route("/me/update").put( isAuthenticatedUser, updateUserProfile);

router.route("admin/users").get(isAuthenticatedUser,authorizeroles("admin"),getAllUser);

module.exports=router;