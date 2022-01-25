const Product=require("../models/Product");
exports.showProducts= function(req,res){
    return Product.find(function (err, products) {
        if (!err) {
          return res.json({products:products});
        } else {
          return console.log(err);
        }}) 
}