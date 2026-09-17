import AddHomeBanner from "../models/adHomeBannerModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
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
export const createHomeBanner = async (req, res) => {
  try {
    const { title, images,textAlignment, price, catName, category, status } = req.body;
    const adBanner = await AddHomeBanner.create({
      title,
      images,
      textAlignment,
      price,
      catName,
      category,
      status,
    });
    return res.status(201).json({
      message: "Home Banner created successfully",
      banner: adBanner,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getHomeBanner = async (req, res) => {
  try {
    const adBanner = await AddHomeBanner.find();
    return res.status(200).json({
      message: "Home Banner fetched successfully",
      adBanner: adBanner,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getHomeBannerById = async (req, res) => {
  try {
    const adBanner = await AddHomeBanner.findById(req.params.id);
    return res.status(200).json({
      message: "Home Banner fetched successfully",
      adBanner: adBanner,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
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
export const deleteHomeBanner = async (req, res) => {
  const deletedBanner = await AddHomeBanner.findById(req.params.id);
  const images = deletedBanner.images;
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
  const deletedAdBanner = await AddHomeBanner.findByIdAndDelete(req.params.id);
  if (!deletedAdBanner) {
    res.status(400).json({
      message: "Home Banner not found!",
      success: true,
    });
  }
  res.status(200).json({
    success: true,
    message: "Home Banner Deleted",
    error: false,
  });
};
export const updatedHomeBanner = async (req, res) => {
  try {
    const { title, images, textAlignment, price, catName, category, status } = req.body;
    const updatedBanner = await AddHomeBanner.findByIdAndUpdate(
      req.params.id,
      {
        title,
        images,
        textAlignment,
        price,
        catName,
        category,
        status,
      },
      { new: true },
    );
    return res.status(200).json({
      message: "Home Banner updated successfully",
      adBanner: updatedBanner,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const toggleBannerStatus = async (req, res) => {
  try {
    const banner = await AddHomeBanner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    banner.status = banner.status === "active" ? "inactive" : "active";
    await banner.save();

    res.json({
      message: "Status updated",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
