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
} from "../controllers/homeBannerControllers.js";

const homeBannerRouter = Router();
homeBannerRouter.post(
  "/uploadImages",
  auth,
  uploads.array("images"),
  uploadImages,
);
homeBannerRouter.post("/create", auth, createHomeBanner);
homeBannerRouter.get("/getallhomebanners", getHomeBanner);
homeBannerRouter.get("/gethomebanner/:id", getHomeBannerById);
homeBannerRouter.put("/update/:id", updatedHomeBanner);
homeBannerRouter.delete("/deleteImage", auth, removeAvatarController);
homeBannerRouter.delete("/:id", deleteHomeBanner);
homeBannerRouter.put("/toggleStatus/:id",toggleBannerStatus);

export default homeBannerRouter;
