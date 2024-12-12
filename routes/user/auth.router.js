const userAuthRouter = require("express").Router();

const {signupUser, loginUser }=require("../../controllers/Auth/auth.controller")
userAuthRouter.post("/signup",signupUser)
userAuthRouter.post("/login",loginUser)


module.exports = userAuthRouter;