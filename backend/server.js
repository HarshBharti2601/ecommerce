const app=require("./app");
const dotenv=require("dotenv");
const connectDatabase=require("./config/database");

process.on("uncaught Exception",(err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to uncaught Exception`);

      process.exit(1);
  
})






dotenv.config({path:"backend/config/config.env"});
connectDatabase();

const server=app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost: ${process.env.PORT}`)
});




process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled Promise Rejection`);
    server.close(()=>
        process.exit(1)
    );
})