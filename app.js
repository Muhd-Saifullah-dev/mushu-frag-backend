const express=require("express")
const app=express()
const reqResInspector=require("express-req-res-inspector")
const {globaleErrorMiddleware}=require("./middlewares/globalError.middleware")
const rootRouter = require("./routes")



app.use(reqResInspector())
app.use(express.json({limit:"100mb"}))
app.use(express.urlencoded({
    extended:true
}))
app.use(globaleErrorMiddleware)
app.get("/api/v1/health-check", (req, res, next) => {
    return res.status(200).json({
      success: true,
      data: null,
      message: "Server is running",
    });
  });
app.use("/api/v1",rootRouter);


module.exports=app