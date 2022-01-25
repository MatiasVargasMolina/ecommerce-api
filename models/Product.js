const mongoose = require("mongoose")
const product = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    imgPath:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required: true,
    },
    stock:{
        type:Number,
        required: true,
    },
});
module.exports = mongoose.model("Product",product);