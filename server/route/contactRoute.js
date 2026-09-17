import { Router } from "express";
import { sendContactMessageController } from "../Controllers/contactController.js";

const contactRouter = Router();

contactRouter.post("/send", sendContactMessageController);

export default contactRouter;