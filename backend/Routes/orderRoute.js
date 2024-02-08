const express= require("express");

const newOrder = require("../Controllers/orderController");

const {isAuthenticatedUser ,authorizeRoles}= require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser,newOrder);


module.exports = router;