const express= require("express");
const router = express.Router();



const {isAuthenticatedUser ,authorizeroles}= require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, deleteOrder } = require("../Controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser,newOrder);

router.route("/order/:id").get(isAuthenticatedUser,authorizeroles("admin"),getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser,myOrders);


router.route("/admin/orders").get(isAuthenticatedUser,authorizeroles("admin"),getAllOrders);


router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeroles("admin"),myOrders).delete(isAuthenticatedUser,authorizeroles("admin"),deleteOrder);


module.exports = router;