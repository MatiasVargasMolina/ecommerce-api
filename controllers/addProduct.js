const Product=require('../models/Product');
exports.addProduct=async function(req,res){
    const newProduct = new Product(req.body)
    const savedProduct = await Product.save()
    res.json({savedProduct})
}