const mongoose=require("mongoose")


const userCartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        default:1,
        
    },
    totalPrice:{
        type:Number,
        default:0
    }
},{timestamps:true})

const UserCart=mongoose.model("UserCart",userCartSchema)

module.exports=UserCart