const User=require("../../models/user.model")
const {BadRequestError }=require('../../customError');
const { okResponse } = require("../../utils/handlers.util");


const signupUser=async(req,res,next)=>{
 try {
       const {email,username,password}=req.body;
       
       let user=await User.findOne({email})
       if(user){
           throw new BadRequestError("This email is already registered");
       }
       user=new User({
           email,
           password,
           username
       })
    await user.save()
   
    return okResponse(res,201,"User registered successfully",{
       email: user.email,
       username: user.username,
    })
 } catch (error) {
    console.log("Error in signup", error);
    next(error);
 }

}


const loginUser=async(req,res,next)=>{
    try {
        const {email,password}=req.body
    
        let user=await User.findOne({email})
        if(!user){
            throw new BadRequestError("Invalid Credentials")
        }
        const matchPassword=await user.isPasswordCorrect(password)
        if(!matchPassword){
            throw new BadRequestError("Invalid Credentials")
        }
        const access_token=await user.generateAccessToken()
    
        okResponse(res,200,"user loggedIn successfully",{
            email:user.email,
       },{
        access_token:access_token
       })
    } catch (error) {
        console.log("Error in login", error);
    next(error);
    }

}

module.exports={signupUser,loginUser}