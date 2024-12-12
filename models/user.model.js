const mongoose=require('mongoose')
const bcrypt=require("bcrypt")
const JWT=require("jsonwebtoken")
const token=require("../configs/config")


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
        
    }, 
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }

},{timestamps:true})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next
    this.password=await bcrypt.hash(this.password,10)
})



userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  userSchema.methods.generateAccessToken = function () {
    return JWT.sign(
      {
        id: this._id,
        email: this.email,
        username: this.username,
        role: this.role,
      },
      token.ACCESS_TOKEN_SECRET,
      {
        expiresIn: token.ACCESS_TOKEN_EXPIRY,
      }
    );
  };


const User= mongoose.model("User",userSchema)

module.exports=User