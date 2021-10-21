const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const transactionRoute = require("./routes/transaction");
const mongoose = require("mongoose");
const conn = require("./conn")
const cors=require("cors");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


//Mongoose Connection

conn.then((resp)=>console.log("DB connected"));

app.use("/api",userRoute);
app.use("/api",transactionRoute);

app.listen(5050,()=>{
    console.log("server is running at port 5050");
})