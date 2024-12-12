
// const User=require("../../models/user.model")
// const Product=require("../../models/product.model")
// const { BadRequestError }=require("../../customError")
// const UserCart=require("../../models/userCart.model")

// const addToCart=async(req,res,next)=>{
//     const { id }=req.params
//     const userId=req.user.id
//     const product=await Product.findById(id)

//     if(!product){
//         throw new BadRequestError("product is not found")
//     }

//     const existingUserCart=await UserCart.findOne(
//         {userId,{}}
//     )
// }