import { Router } from "express";
import auth from "../middlewares/auth.js";
import uploads from "../middlewares/multer.js";
import {
  createHomeBanner,
  deleteHomeBanner,
  getHomeBanner,
  getHomeBannerById,
  removeAvatarController,
  toggleBannerStatus,
  updatedHomeBanner,
  uploadImages,
} from "../controllers/adHomeBannerController.js";

const adHomeBannerRouter = Router();
adHomeBannerRouter.post(
  "/uploadImages",
  auth,
  uploads.array("images"),
  uploadImages,
);
adHomeBannerRouter.post("/create", auth, createHomeBanner);
adHomeBannerRouter.get("/getalladbanners", getHomeBanner);
adHomeBannerRouter.get("/getadbanner/:id", getHomeBannerById);
adHomeBannerRouter.put("/update/:id", updatedHomeBanner);
adHomeBannerRouter.delete("/deleteImage", auth, removeAvatarController);
adHomeBannerRouter.delete("/:id", deleteHomeBanner);
adHomeBannerRouter.put("/toggleStatus/:id",toggleBannerStatus);

export default adHomeBannerRouter;
