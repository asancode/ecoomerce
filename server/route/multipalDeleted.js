import { Router } from "express";
import { deleteMultipleProducts} from "../controllers/multipleDeletedController.js";

const multipleDeletedRouter = Router();
multipleDeletedRouter.delete('/deleteMultiple',deleteMultipleProducts)


export default multipleDeletedRouter