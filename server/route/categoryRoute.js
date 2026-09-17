import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategoriesCount, getSingleCategory, getSubCategoriesCount, removeAvatarController, updatedCategory, uploadImages } from "../controllers/categoryController.js";
import auth from "../middlewares/auth.js";
import uploads from "../middlewares/multer.js";

const categoryRouter = Router();
categoryRouter.post('/uploadImages',auth,uploads.array("images"),uploadImages)
categoryRouter.post('/create',auth,createCategory)
categoryRouter.get('/',getCategories)
categoryRouter.get('/get/count',getCategoriesCount)
categoryRouter.get('/get/count/subCat',getSubCategoriesCount)
categoryRouter.get('/:slug',getSingleCategory)
categoryRouter.delete('/delete-user',removeAvatarController)
categoryRouter.delete('/:id',deleteCategory)
categoryRouter.put('/:id',updatedCategory)

export default categoryRouter;