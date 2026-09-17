import express from "express";
import { getMedia } from "../controllers/mediaController.js";

const mediaRouter = express.Router();

mediaRouter.get("/:id", getMedia);

export default mediaRouter;