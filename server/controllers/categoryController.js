import Category from "../models/categoryModel.js";
import { v2 as cloudinary } from "cloudinary";
import slugify from "slugify";
import fs from "fs";
import { error } from "console";
cloudinary.config({
  cloud_name: process.env.CLOUINARY_NAME,
  api_key: process.env.CLOUINARY_API_KEY,
  api_secret: process.env.CLOUINARY_SECRET,
});

var imagesArr = [];
export const uploadImages = async (req, res) => {
  // try {
  //   imagesArr = [];
  //   const images = req.files;
  //   const options = {
  //     user_filename: true,
  //     unique_filename: false,
  //     overwrite: true,
  //   };
  //   for (let i = 0; i < images?.length; i++) {
  //     const img = await cloudinary.uploader.upload(
  //       images[i].path,
  //       options,
  //       //     imagesArr.push(img.secure_url)
  //       // fs.unlinkSync(`uploads/${req.files[i].filename}`)
  //       function (error, result) {
  //         // console.log(result);
  //         imagesArr.push(result.secure_url);
  //         fs.unlinkSync(`uploads/${images[i].filename}`);
  //         // console.log(image[i].filename);
  //       }
  //     );
  //   }
  //   return res.status(200).json({
  //     message: "Images uploaded successfully",
  //     images: imagesArr,
  //     error: false,
  //     success: true,
  //   });
  // } catch (error) {
  //   return res.status(500).json({
  //     message: error.message || "Internal Server Error",
  //     error: true,
  //     success: false,
  //   });
  // }
    try {
    let imagesArr = [];
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({
        message: "No images uploaded",
        success: false,
      });
    }

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(
        images[i].path,
        options
      );

      imagesArr.push(result.secure_url);

      // delete local file after upload
      fs.unlinkSync(images[i].path);
    }

    return res.status(200).json({
      message: "Images uploaded successfully",
      images: imagesArr,
      success: true,
      error: false,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }


};
export const createCategory = async (req, res) => {
  try {
    const { name, images, parentId, parentCatName } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name is required",
        success: false,
      });
    }

    const category = await Category.create({
      name,
      slug: slugify(name, { lower: true }),
      images: images || [],
      parentId,
      parentCatName,
    });

    return res.status(201).json({
      message: "Category created successfully",
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
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id] = { ...cat._doc, children: [] };
    });
    const rootCategories = [];
    categories.forEach((cat) => {
      if (cat.parentId) {
        categoryMap[cat.parentId]?.children.push(categoryMap[cat._id]);
      } else {
        rootCategories.push(categoryMap[cat._id]);
      }
    });
    return res.status(200).json({
      message: "Categories fetched successfully",
      data: rootCategories,
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
export const getCategoriesCount = async (req, res) => {
  try {
    const categoryCount = await Category.countDocuments({
      parentId: undefined,
    });
    if (!categoryCount) {
      res.status(400).json({
        success: false,
        error: true,
      });
    } else {
      res.send({ categoryCount: categoryCount });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
export const getSubCategoriesCount = async (req, res) => {
  try {
    const subCategoryCount = await Category.find();
    if (!subCategoryCount) {
      res.status(500).json({ success: false, error: true });
    } else {
      const subCatList = [];
      for (let cat of subCategoryCount) {
        if (cat.parentId !== undefined) {
          subCatList.push(cat);
        }
      }
      res.send({
        subCategoryCount: subCatList.length,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
export const getSingleCategory = async (req, res) => {
  try {
    // const categoryList = await Category.find()
    const category = await Category.findById({ slug: req.params.slug });
    if (!category) {
      res
        .status(500)
        .json({
          message: "The Category with the given ID was not Found",
          error: true,
          success: false,
        });
    }
    return res.status(200).json({
      error: false,
      success: true,
      category: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
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
      (error, result) => {}
    );
    if (res) {
      return response.status(200).json({
        error:false,
        success:true,
        message:"image deleted successfully"
      });
    }
  }
};
export const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  const images = category.images;
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
  const subCategory = await Category.find({
    parentId: req.params.id,
  });
  for (let i = 0; i < subCategory.length; i++) {
    const thirdsubCategory = await Category.find({
      parentId: subCategory[i]._id,
    });
    for (let i = 0; i < thirdsubCategory.length; i++) {
      const deletedThirdSubCat = await Category.findByIdAndDelete(
        thirdsubCategory[i]._id
      );
    }
    const deletedSubCat = await Category.findByIdAndDelete(subCategory[i]._id);
  }
  const deletedCat = await Category.findByIdAndDelete(req.params.id);
  if (!deletedCat) {
    res.status(400).json({
      message: "Category not found!",
      success: true,
    });
  }
  res.status(200).json({
    success: true,
    message: "Category Deleted",
    error: false,
  });
};
export const updatedCategory = async (req, res) => {
  try {
    const { name, images, parentId, parentCatName } = req.body;

    const updatedData = {
      name,
      parentId,
      parentCatName,
    };

    // Update slug only if name is changed
    if (name) {
      updatedData.slug = slugify(name, { lower: true });
    }

    // Update images if provided
    if (images) {
      updatedData.images = images;
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found!",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      category,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

// export const updatedCategory = async (req, res) => {
//   const category = await Category.findByIdAndUpdate(
//     req.params.id,
//     {
//       name: req.body.name,
//       slug: req.body.name
//         ? slugify(req.body.name, { lower: true })
//         : category.slug,
//       images: imagesArr.length > 0 ? imagesArr[0] : req.body.images,
//       parentId: req.body.parentId,
//       parentCatName: req.body.parentCatName,
//     },
//     { new: true }
//   );
//   if (!category) {
//     return res.status(500).json({
//       message: "Category cannot be Updated!",
//       success: false,
//       error: true,
//     });
//   }
//   imagesArr = [];
//   res.status(200).json({
//     error: false,
//     success: true,
//     category: category,
//   });
// };
