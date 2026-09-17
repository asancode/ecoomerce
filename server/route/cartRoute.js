import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addToCartItemController, deleteCartItemQtyController, emptyeCartController, getCartItemController, updateCartItemQtyController } from "../controllers/cartController.js";

const cartRouter = Router();
cartRouter.post('/add',auth,addToCartItemController)
cartRouter.get('/get',auth,getCartItemController)
cartRouter.put('/update-qty',auth,updateCartItemQtyController)
cartRouter.delete('/delete-cart-item/:id',auth,deleteCartItemQtyController)
cartRouter.delete('/emtyCart/:id',auth,emptyeCartController)
export default cartRouter