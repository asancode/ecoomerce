import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import { addToMyListController,deleteToMyListController, getMyListController } from "../controllers/myListController.js";


const myListRouter = Router();
myListRouter.post('/add',auth,addToMyListController)
myListRouter.delete('/:id',auth,deleteToMyListController)
myListRouter.get('/',auth,getMyListController)

export default myListRouter