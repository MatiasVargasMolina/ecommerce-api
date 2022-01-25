const express = require("express")
var router = express.Router()
const Product= require("../models/Product")
const showProducts=require("../controllers/showProducts")
router.get("/products",async function(req,res){
    try{
        const products= await Product.find();
        res.json(products)
    }
    catch (error){
        res.json(error)
    }
})
router.get("/productshome",async function(req,res){
    try{
        const products= await Product.find();
        var productsHome=[];
        products.map((product)=>{if(product.category==="home"){productsHome.append(product)}});
        res.json(productsHome)
    }
    catch (error){
        res.json(error)
    }
})
router.get("/Products/:id", async function(req,res){
    const ProductFound = await Product.findById(req.params.id);
    if(!ProductFound) return res.status(204).json();
    res.json(ProductFound)
})
router.post("/createProduct",async function(req,res){
    const newProduct = new Product(req.body)
    newProduct.save()
})
router.delete("/Products/:id",async function(req,res){
    const ProductFound = await Product.findByIdAndDelete(req.params.id);
    if(!ProductFound) return res.status(204).json();
    return res.json(ProductFound)
})
module.exports =router;