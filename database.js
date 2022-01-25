const mongoose = require("mongoose")
const MONGODB_URI = "mongodb+srv://matias:Wez84250203@cluster0.2zmos.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const connectDB=async()=>{
    try{
    await mongoose.connect(MONGODB_URI,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useCreateIndex: true
    });
    console.log("db connected")
    }
    catch(err){
        console.log(err)
    }
}
module.exports = connectDB;