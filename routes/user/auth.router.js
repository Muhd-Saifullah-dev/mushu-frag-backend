const userAuthRouter = require("express").Router();

const {signupUser }=require("../../controllers/Auth/auth.controller")
userAuthRouter.post("/signup",signupUser)

module.exports = userAuthRouter;