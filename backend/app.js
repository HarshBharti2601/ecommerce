const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");

const errorMiddleware=require("./middleware/error");
app.use(express.json());
app.use(cookieParser());


const product=require("../backend/Routes/productRouter");
const user=require("../backend/Routes/userRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
  

app.use(errorMiddleware);

module.exports=app;