const express=require("express")
const app=express()
const reqResInspector=require("express-req-res-inspector")
const {globaleErrorMiddleware}=require("./middlewares/globalError.middleware")
const rootRouter = require("./routes")
const cors=require("cors")


app.use(reqResInspector())
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.get("/api/v1/health-check", (req, res, next) => {
    return res.status(200).json({
      success: true,
      data: null,
      message: "Server is running",
    });
  });
app.use("/api/v1",rootRouter);

app.use(cors({
  credentials:true,
  origin:"/*"
}))
app.use(globaleErrorMiddleware)

module.exports=app