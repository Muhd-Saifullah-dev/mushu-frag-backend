const JWT=require("jsonwebtoken")
const {UnauthorizedError, ValidationError }=require("../customError")
const {ACCESS_TOKEN_SECRET}=require("../configs/config")
const User = require("../models/user.model")



const verifyJwt=async(req,res,next)=>{
   try {
     const authHeader=req.headers.authorization
     if(!authHeader || !authHeader.startsWith("Bearer ")){
         throw new UnauthorizedError("Missing Authorization headers with Bearer token")
     }
     const token = authHeader.replace("Bearer ", "");
     const decoded= JWT.verify(token, ACCESS_TOKEN_SECRET)
     const  user=await User.findById(decoded.id)
     if(!user){
       throw new UnauthorizedError("User not found. Please login again.");
     }
       req.user = decoded;
       next();
   } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
        console.log("JWT ERROR : ", error.message);
        next("please login again");
      } else {
        console.log("jwt verify error", error);
      }
      next(error);
   }
}

const verifyAdmin=async(req,res,next)=>{
    if(req.user.role !== "ADMIN"){
        throw new ValidationError("access denied Admin only")
    }
    next()
}

module.exports={verifyAdmin,verifyJwt}