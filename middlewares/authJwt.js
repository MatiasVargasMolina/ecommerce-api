const jwt = require("jsonwebtoken")
const config = require("../config")
const role= require("../models/role")
exports.verifyToken = async(req, res, next)=>{
    try{
        const token=req.cookies.token
        if (token) {
            jwt.verify(token, config.key.SECRET, (err, decoded) => {      
              if (err) {
                return res.json({ message: 'Token inválida' });
              } else {
                req.decoded = decoded;
                console.log("exito");
                next();
              }
            });
          } else {
            res.send({ 
                message: 'Token no proveída.' 
            });
          }
    }catch(error){
        return res.status(401).json({message:" Unauthorized"})
    }
}
exports.isAdmin=async(req,res,next)=>{
    const user = await User.findById(req.userId)
    const roles = await role.find({_id: {$in: user.roles}})
    for (let i = 0; i < roles.length; i++){
        if(roles[i].name==="admin"){
        next()
        return;
        }
    }
    return res.status(403).json({message:"requer Moderate role"})
}