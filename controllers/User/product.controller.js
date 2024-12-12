const Product = require("../../models/product.model")
const { NotFoundError }=require("../../customError")
const { okResponse }=require("../../utils/handlers.util")

const fetchAllProduct=async(req,res,next)=>{
try {
        const products=await Product.find()
        if(products.length===0){
            throw new NotFoundError("No products found")
        }
        return okResponse(res,200, "Products fetched successfully", products)
} catch (error) {
    console.log("Error in fetching products:", error);
    next(error);
};
}

const fetchByCategoryPage=async(req,res,next)=>{
    try {
        // Extract the page and category from the query parameters
        const { page = 1, limit = 10, category } = req.query;
    
        // Validate that category is provided
        if (!category) {
          throw new BadRequestError("Category is required.");
        }
    
        // Parse page and limit to integers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
    
        // Ensure valid page and limit values
        if (isNaN(pageNumber) || pageNumber < 1) {
          throw new BadRequestError("Invalid page number.");
        }
        if (isNaN(limitNumber) || limitNumber < 1) {
          throw new BadRequestError("Invalid limit value.");
        }
    
        // Calculate the number of items to skip
        const skip = (pageNumber - 1) * limitNumber;
    
        // Fetch products filtered by category, with pagination
        const products = await Product.find({ category })
          .skip(skip)
          .limit(limitNumber);
    
        // Count total products in that category (for pagination info)
        const totalProducts = await Product.countDocuments({ category });
    
        // Calculate total number of pages
        const totalPages = Math.ceil(totalProducts / limitNumber);
    
        // If no products found, return a message
        if (products.length === 0) {
          return okResponse(res, "No products found for this category", []);
        }
    
        // Return the response with paginated products
        return okResponse(res,200, "Products fetched successfully", {
          products,
          page: pageNumber,
          limit: limitNumber,
          totalProducts,
          totalPages
        });
      } catch (error) {
        console.log("Error in fetchByCategoryPage:", error);
        next(error);  // Pass the error to the global error handler
      }
}

module.exports={fetchAllProduct,fetchByCategoryPage}