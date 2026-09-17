import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addAddress, deleteAddressController, editAddress, getAddress, getSingleAddressController } from "../controllers/addressController.js";

const addressRouter = Router();
addressRouter.post('/add', auth, addAddress)
addressRouter.get('/get',auth,getAddress)
addressRouter.get('/:id',auth,getSingleAddressController)
addressRouter.delete('/:id',auth,deleteAddressController)
addressRouter.put('/:id',auth,editAddress)

export default addressRouter