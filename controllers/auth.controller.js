const User= require("../models/user")
const jwt = require("jsonwebtoken")
const config = require("../config")
const bcryptjs= require("bcryptjs")
const Roles = require("../models/role")
exports.signUp = async (req,res) =>{
    const newPass = await bcryptjs.hash(req.body.password, 10)
    const roles= req.body.roles
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: newPass})
    if(roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles= foundRoles.map(role => role._id)
    }else{
        const role= await Roles.findOne({name:"user"})
        newUser.roles= [role._id]
    }
    const saveUser = await newUser.save();
    const token= await jwt.sign({id: saveUser._id},config.key.SECRET,{
        expiresIn: 8640000
    })

    res
        .status(202)
        .cookie('token', token,{
                                expires: new Date(new Date().getTime()+ 100 * 1000),
                                httpOnly: true,}).json({status:"exito"})
}
exports.signIn = async (req,res) =>{
    const userFound = await (await User.findOne({email:req.body.email})).populate("roles")
    if(!userFound) return res.status(400).json({message: "User not found"})
    const matchPassword=await User.comparePassword(req.body.password,userFound.password)
    if(!matchPassword) return res.status(401).json({token: null, message: "invalid Password"})
    const token=jwt.sign({id:userFound._id.toString()},config.key.SECRET,{expiresIn: 86400})
    res
        .status(202)
        .cookie('token', token,{
            expires: new Date(new Date().getTime()+ 100 * 1000)}).json({message:"exito"})
}
exports.verifyLogin= (req,res)=>{
    res.json({"status":true});
}