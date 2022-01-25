const mongoose = require("mongoose")
const pedido = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    direction:{
        type:String,
        required: true,
    },
    rut:{
        type: Number,
        required:true,
    },
    totalPrice:{
        type:Number,
        required: true,
    },
    productos: [{
        ref:"Product",
        type: Mongoose.Types.ObjectId
      }],
});
module.exports = mongoose.model("Pedido",pedido);