 const Order = require("../models/orderModel");
 const Product = require("../models/productModel");
 const ErrorHandler = require("../utils/errorhandler");
 const catchasyncErrors = require("../middleware/catchasyncerror");


 exports.newOrder = catchasyncErrors(async(req,res,next)=>{

   const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
   } = req.body;

   const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user: req.user._id
   }) ;

   res.status(201).json({
    success:true,
    order

   });


 });

 exports.getSingleOrder = catchasyncErrors(async(req,res,next)=>{

    const order = await Order.findById(req.params.id).populate("user",
    "name email");


    if(!order){
      return next(new ErrorHandler ("Order not found with Id",404));
    }

    res.status(200).json({
      success:true,
      order
    });

 });

 exports.myOrders = catchasyncErrors(async(req,res,next)=>{

  const orders = await Order.find({ user:req.user._id});


  

  res.status(200).json({
    success:true,
    orders
  });

});

// get all orders -- admin

exports.getAllOrders= catchasyncErrors(async(req,res,next)=>{
   
  const orders = await Order.find();

  let Totalamount =0;

  orders.forEach((order)=>{

    Totalamount=Totalamount+order.totalPrice;
  });

  res.status(200).json({
   success:true,
   orders,
   Totalamount

  }); 

});

//update order  status -- admin

exports.updateOrderstatus = catchasyncErrors(async(req,res,next)=>{

  const order = await Order.findById(req.params.id);

  if (!order){

    return next (new ErrorHandler("Order was not found with the id",404))
   };


  if(order.orderstatus === "Delivered"){
    return next(new ErrorHandler ("You have already delivered this order",400));
  }

  order.orderItems.forEach(async (order)=>{
    await updateStock(order.Product,order.quantity); 
  });

  order.orderstatus = req.body.status;

  if(req.body.status === "Delivered"){
  order.deliveredAt  = Date.now()
  };

  await order.save({validateBeforeSave :false});

  res.status(200).json({
    success:true,
    
  });

});

async function updateStock (id,quantity){

  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({validateBeforeSave:fals});
};

exports.deleteOrder =catchasyncErrors(async(req,res,next)=>{

   const order = await Order.find(req.params.id);


   if (!order){

    return next (new ErrorHandler("Order was not found with the id",404))
   };

   await order.remove();

   res.status(200).json({
  success:true,

   })

})
