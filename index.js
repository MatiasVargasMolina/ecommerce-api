const express = require("express")
const connectDB=require("./database");
const cors=require("cors")
const cookieParser=require("cookie-parser")
const morgan=require("morgan")
const secret=require("./config")
const createRoles = require("./libs/initialSetup")
const app=express();
const log=require("./routes/log")
const axios=require("axios")
createRoles.createRoles();
connectDB();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use(morgan("dev"))
app.use(cookieParser())
app.use(require("./routes/products"))
app.use(require("./routes/webpay_plus"))
app.use(require("./routes/auth.routes"))
app.use(log)
app.listen(3200,function(){
    console.log("hola")
})

