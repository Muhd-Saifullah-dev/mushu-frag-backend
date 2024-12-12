const mongoose=require("mongoose")


const productSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true,
     },
    decription:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
        required:false
    },
    category:{
        type:String,
        enum:["HIM","HER"],
        required:true
    }



},{timestamps:true})

const Product=mongoose.model("Product",productSchema)
module.exports=Product