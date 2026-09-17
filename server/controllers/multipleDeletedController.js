import ProductModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUINARY_NAME,
  api_key: process.env.CLOUINARY_API_KEY,
  api_secret: process.env.CLOUINARY_SECRET,
});
import BlogModel from "../models/blogModels.js";

export const deleteMultipleProducts = async (req, res) => {
  const { ids } = req.body; // Expecting an array of product IDs to delete
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({
      success: false,
      error: true,
      message: "Please provide an array of product IDs to delete",
    });
  }
  for (let i = 0; i < ids?.length; i++) {
    const product = await ProductModel.findById(ids[i]);
    const images = product.images;
    let img = "";
    for (img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
      if (imageName) {
        cloudinary.uploader.destroy(imageName, (error, result) => {});
      }
    }
  }
  try {
    await ProductModel.deleteMany({ _id: { $in: ids } });
    return res.status(200).json({
      success: true,
      error: false,
      message: "Products Deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Error while deleting products",
    });
  }
};
export const deleteMultipleBlogs = async (req, res) => {
  const _id  = req.body; // Expecting an array of blog IDs to delete
  if (!_id || !Array.isArray(_id)) {
    return res.status(400).json({
      success: false,
      error: true,
      message: "Please provide an array of blog IDs to delete",
    });
  }
  for (let i = 0; i < _id?.length; i++) {
    const blog = await BlogModel.findById(_id[i]);
    const images = blog.images;
    let img = "";
    for (img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
      if (imageName) {
        cloudinary.uploader.destroy(imageName, (error, result) => {});
      }
    }
  }
  try {
    await BlogModel.deleteMany({ _id: { $in: _id } });
    return res.status(200).json({
      success: true,
      error: false,
      message: "Blogs Deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Error while deleting blogs",
    });
  }
};
// export const deleteMultipleBlogs = async (req, res) => {
//   const { id } = req.body; // Expecting an array of product IDs to delete
//   if (!id || !Array.isArray(id)) {
//     return res.status(400).json({
//       success: false,
//       error: true,
//       message: "Please provide an array of product IDs to delete",
//     });
//   }
//   for (let i = 0; i < id?.length; i++) {
//     const blog = await BlogModel.findById(id[i]);
//     const images = blog.images;
//     let img = "";
//     for (img of images) {
//       const imgUrl = img;
//       const urlArr = imgUrl.split("/");
//       const image = urlArr[urlArr.length - 1];
//       const imageName = image.split(".")[0];
//       if (imageName) {
//         cloudinary.uploader.destroy(imageName, (error, result) => {});
//       }
//     }
//   }
//   try {
//     await BlogModel.deleteMany({ _id: { $in: id } });
//     return res.status(200).json({
//       success: true,
//       error: false,
//       message: "Blogs Deleted!",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: error.message || "Error while deleting blogs",
//     });
//   }
// };