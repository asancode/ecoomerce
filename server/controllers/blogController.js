import BlogModel from "../models/blogModels.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import slugify from "slugify";
cloudinary.config({
  cloud_name: process.env.CLOUINARY_NAME,
  api_key: process.env.CLOUINARY_API_KEY,
  api_secret: process.env.CLOUINARY_SECRET,
});

var imagesArr = [];
export const uploadImages = async (req, res) => {
  try {
    imagesArr = [];
    const image = req.files;
    const options = {
      user_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    for (let i = 0; i < image?.length; i++) {
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        //     imagesArr.push(img.secure_url)
        // fs.unlinkSync(`uploads/${req.files[i].filename}`)
        function (error, result) {
          // console.log(result);
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${image[i].filename}`);
          // console.log(image[i].filename);
        },
      );
    }
    return res.status(200).json({
      message: "Images uploaded successfully",
      images: imagesArr,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
export const createBlog = async (req, res) => {
  // try {
  //   const { title, description, images, seo } = req.body;
  //   // ✅ SLUG
  //   const slug = slugify(title, { lower: true });
  //   // ✅ SEO FIX
  //   const seoData = {
  //     metaTitle: seo?.metaTitle || title,
  //     metaDescription: seo?.metaDescription || description,
  //     keywords:
  //       typeof seo?.keywords === "string"
  //         ? seo.keywords
  //         : Array.isArray(seo?.keywords)
  //           ? seo.keywords.join(", ")
  //           : "",
  //   };
  //   const blog = new BlogModel({
  //     title,
  //     slug,
  //     description,
  //     images: images || [],
  //     seo: seoData,
  //   });
  //   return res.status(200).json({
  //     success: true,
  //     message: "Blog Created Successfully",
  //     data: blog,
  //   });
  // } catch (error) {
  //   return res.status(500).json({
  //     success: false,
  //     message: error.message || "Server Error",
  //   });
  // }
  try {
    const { title, images, description, seo } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Blog title is required",
        success: false,
      });
    }

    const category = await BlogModel.create({
      title,
      slug: slugify(title, { lower: true }),
      images: images || [],
      description: description || "",
      seo: seo || {},
    });

    return res.status(201).json({
      message: "Blog created successfully",
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};
export const getBlog = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await BlogModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res.status(404).json({ error: true, success: false });
    }
    const blogs = await BlogModel.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    return res.status(200).json({
      success: true,
      totalPages: totalPages,
      message: "Get All Blogs",
      data: blogs,
      page: page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
export const GetBlogByCatId = async (req, res) => {
  try {
    const blogs = await BlogModel.findById(req.params.id);
    res.status(200).send({
      success: true,
      error: false,
      message: "Get All Blog",
      data: blogs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Getting Products",
      error,
    });
  }
};
export const removeAvatarController = async (request, response) => {
  const imgURL = request.query.img;
  const urlArr = imgURL.split("/");
  const imgName = urlArr[urlArr.length - 1];
  const imageName = imgName.split(".")[0];
  if (imageName) {
    const res = await cloudinary.uploader.destroy(
      imageName,
      (error, result) => {},
    );
    if (res) {
      return response.status(200).json({
        error: false,
        success: true,
        message: "image deleted successfully",
      });
    }
  }
};
export const deleteBlog = async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
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
  const deletedBlog = await BlogModel.findByIdAndDelete(req.params.id);
  if (!deletedBlog) {
    res.status(400).json({
      message: "Blog not found!",
      success: true,
    });
  }
  res.status(200).json({
    success: true,
    message: "Blog Deleted",
    error: false,
  });
};
export const updatedBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        images: req.body.images,
        seo: req.body.seo,
      },
      { new: true },
    );

    res.json({
      success: true,
      message: "Blog Updated Successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

