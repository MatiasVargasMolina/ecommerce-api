const express = require("express")
var router = express.Router()
const verifyToken= require("../middlewares/authJwt")
router.get("/auth",verifyToken.verifyToken,function(req,res){
    try{
        res.json({
            message:'exito',
        });
        
    }
    catch (error){
        console.log("error")
        res.json(error)
    }

})

module.exports =router;