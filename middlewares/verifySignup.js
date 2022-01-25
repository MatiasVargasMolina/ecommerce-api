const {ROLES} =  require("../models/role")
const User = require("../models/user")
exports.checkRolesExisted=(req,res,next) =>{
    if(req.body.roles){
        for(let i=0; i< req.body.roles.length;i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({message: "Role no exist"})
            }
        }
    }
    next()
}
exports.checkDuplicateUsernameOrEmail = async (req,res,next)=>{
    const user = await User.findOne({username: req.body.username})
    if(user) return res.status(400).json({message:"The user already exists"})
    const email = await User.findOne({email: req.body.email});
    if (email) return res.status(400).json({message:"The email already exists"})
    next()
}