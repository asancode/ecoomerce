import { Router } from "express";
import auth from "../middlewares/auth.js";
import uploads from "../middlewares/multer.js";
import { createProducts, GetAllProductsByPrice,GetProductsByRating, GetProductsByCatIdController, GetProductsByCatName, GetProductsBySubCatIdController, GetProductsBySubCatName, GetProductsController, uploadImages, GetProductsCount, GetFeatureProducts,getSingleProducts, updatedProduct, DeleteProductsController, filters, sortBy } from "../controllers/productContreoller.js";
import { deleteMultipleProducts} from "../controllers/multipleDeletedController.js";

const productRouter = Router();
productRouter.post('/uploadImages',auth,uploads.array("images"),uploadImages)
productRouter.post('/create',auth,createProducts)
productRouter.get('/getallproduct',GetProductsController)
productRouter.get('/getproductbycat/:id',GetProductsByCatIdController)
productRouter.get('/getproductbycatname',GetProductsByCatName)
productRouter.get('/getAllProductBySubCatId/:id',GetProductsBySubCatIdController)
productRouter.get('/getAllProductBySubCatName',GetProductsBySubCatName)
productRouter.get('/getAllProductByPrice',GetAllProductsByPrice)
productRouter.get('/getAllProductByRating',GetProductsByRating)
productRouter.get('/productsCount',GetProductsCount)
productRouter.get('/getFeatureProducts',GetFeatureProducts)
productRouter.delete('/:id',DeleteProductsController)
productRouter.delete('/deleteMultiple',deleteMultipleProducts)
productRouter.get('/:slug',getSingleProducts)
productRouter.put('/updated/:id',updatedProduct)
productRouter.post('/filter',filters)
productRouter.post('/sortby',sortBy)

export default productRouter