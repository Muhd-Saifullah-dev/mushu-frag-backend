const userRouter = require("express").Router();
const userAuthRouter = require("./auth.router");



userRouter.use("/auth",userAuthRouter);


module.exports = userRouter;