const Product=require("../../models/product.model");
const { okResponse } = require("../../utils/handlers.util");
const { BadRequestError} =require("../../customError")
const cloudinary=require("../../configs/cloudhinary.config")
const addFragence=async(req,res,next)=>{
    try {
        const {title,description,price,discountPrice,category}=req.body;
        if (!title || !description || !price || !category) {
            throw new BadRequestError("Missing required fields: title, description, price, category.");
          }

          const existingProductTitle = await Product.findOne({ title });
          if (existingProductTitle) {
            throw new BadRequestError("Fragrance with this title already exists.");
          }


          if (!req.file) {
            return next(new BadRequestError("No image file uploaded."));
          }


          const uploadedImage = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream({ folder: "mushu-frag-images" }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
              })
              .end(req.file.buffer);
          });

          const product=new Product({
            title,
            description,
            price,
            discountPrice:discountPrice || null,
            category,
            imageUrl:uploadedImage.secure_url
          })
          await product.save()
          okResponse(res,200,"add new fragence",product)
    } catch (error) {
        console.log("error in add fragence ",error)
        next(error)
    }
}




const deletefragence=async(req,res,next)=>{
try {
    const { id }=req.params
    const deleteProduct=await Product.findByIdAndDelete(id)
    if(!deleteProduct){
      throw new BadRequestError("fragence not found")
    }
    okResponse(res,200,"fragence deleted successfully")
} catch (error) {
  console.log("error in delete fragence",error)
  next(error)
}

}

module.exports={deletefragence, addFragence}