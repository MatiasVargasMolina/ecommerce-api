const express =  require("express")
const router =  express.Router()
const authCtrl = require("../controllers/auth.controller")
const verifySignup = require("../middlewares/verifySignup")
const jwtverify=require("../middlewares/authJwt").verifyToken;
router.post("/signup",authCtrl.signUp);
router.post("/sigin",authCtrl.signIn);
router.get("/verify",jwtverify,authCtrl.verifyLogin);

module.exports =router;