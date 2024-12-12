const userAuthRouter = require("express").Router();
const {verifyJwt }=require("../../middlewares/auth.middleware")
const {signupUser, loginUser }=require("../../controllers/Auth/auth.controller")
const {addFragence  }=require('../../controllers/Admin/product.admin')
const upload=require("../../middlewares/multer.middleware")
const {fetchAllProduct,fetchByCategoryPage }=require("../../controllers/User/product.controller")

userAuthRouter.post("/signup",signupUser)
userAuthRouter.post("/login",loginUser)
userAuthRouter.post("/add-product",verifyJwt,upload.single("image"),addFragence)
userAuthRouter.get("/get-all",verifyJwt,fetchAllProduct)
userAuthRouter.get("/fetch-category",verifyJwt,fetchByCategoryPage)
module.exports = userAuthRouter;