import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  createBlog,
  deleteBlog,
  getBlog,
  GetBlogByCatId,
  removeAvatarController,
  updatedBlog,
  uploadImages,
} from "../controllers/blogController.js";
import uploads from "../middlewares/multer.js";
import { deleteMultipleBlogs } from "../controllers/multipleDeletedController.js";

const blogRouter = Router();
blogRouter.post("/uploadImages", auth, uploads.array("images"), uploadImages);
blogRouter.post("/add", auth, createBlog);
blogRouter.get("/get", getBlog);
blogRouter.get("/get/:id", GetBlogByCatId);
blogRouter.delete("/:id", auth, deleteBlog);
blogRouter.delete('/delete-user',removeAvatarController)
blogRouter.put("/update/:id", auth, updatedBlog);
blogRouter.delete("/deleteMultiple", deleteMultipleBlogs);

export default blogRouter;
