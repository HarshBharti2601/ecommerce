const express= require("express");
const router = express.Router();



const {isAuthenticatedUser ,authorizeroles}= require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, deleteOrder, updateOrderstatus } = require("../Controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser,newOrder);

router.route("/order/:id").get(isAuthenticatedUser,authorizeroles("admin"),getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser,myOrders);


router.route("/admin/orders").get(isAuthenticatedUser,authorizeroles("admin"),getAllOrders);


router.route("/admin/order/:id").delete(isAuthenticatedUser,authorizeroles("admin"),deleteOrder).put(isAuthenticatedUser,authorizeroles("admin"),updateOrderstatus);


module.exports = router;