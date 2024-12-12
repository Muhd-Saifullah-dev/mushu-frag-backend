const userRouter = require("./user");

const rootRouter = require("express").Router();


rootRouter.use("/user",userRouter);


module.exports = rootRouter;