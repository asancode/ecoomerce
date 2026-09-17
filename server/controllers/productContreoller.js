import ProductModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import { error } from "console";
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

//create products
export const createProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      catName,
      category,
      isFeatured,
      variation,
      seo,
      images,
      rating,
    } = req.body;

    // ✅ VALIDATION
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and Price are required",
      });
    }

    // ✅ SLUG
    const slug = slugify(name, { lower: true });

    // ✅ SEO FIX
    const seoData = {
      metaTitle: seo?.metaTitle || name,
      metaDescription: seo?.metaDescription || description,
      keywords:
        typeof seo?.keywords === "string"
          ? seo.keywords
          : Array.isArray(seo?.keywords)
            ? seo.keywords.join(", ")
            : "",
    };

    // ✅ SAFE VARIATIONS
    const safeVariations = Array.isArray(variation) ? variation : [];

    const cleanVariations = safeVariations.map((v) => ({
      title: v.title || "",
      required: v.required || false,
      options: Array.isArray(v.options)
        ? v.options.map((opt) => ({
            name: opt.name || "",
            price: Number(opt.price) || 0,
          }))
        : [],
    }));

    // ✅ CREATE PRODUCT
    const product = new ProductModel({
      name,
      slug,
      description,
      images: images || [], // safe
      price,
      catName,
      category,
      isFeatured,
      variation: cleanVariations,
      seo: seoData,
      rating,
    });

    const savedProduct = await product.save();

    return res.status(200).json({
      success: true,
      message: "Product Created Successfully",
      product: savedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const GetProductsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res.status(404).json({ error: true, success: false });
    }
    const products = await ProductModel.find({})
      .populate("category")
      .skip((page - 1) * perPage)
      // .select("-photo")
      .limit(perPage)
      .exec();
    // .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalPages: totalPages,
      message: "All Products Get",
      product: products,
      page: page,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Getting Products",
      error,
    });
  }
};
export const GetProductsByCatIdController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res.status(404).json({ error: true, success: false });
    }
    const product = await ProductModel.find({
      category: req.params.id,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    res.status(200).send({
      success: true,
      totalPages: totalPages,
      message: "All Products Get",
      product: product,
      page: page,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Getting Products",
      error,
    });
  }
};
export const GetProductsByCatName = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res.status(404).json({ error: true, success: false });
    }

    const product = await ProductModel.find({
      catName: req.query.catName,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      // .select("-photo")
      .limit(perPage)
      .exec();
    // .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalPages: totalPages,
      message: "All Products Get",
      products: product,
      page: page,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Getting Products",
      error,
    });
  }
  // try {
  //   const products = await ProductModel.find({})
  //     // .populate("category")
  //     .select("-photo")
  //     .limit(12)
  //     // .sort({ createdAt: -1 });
  //   res.status(200).send({
  //     success: true,
  //     total: products.length,
  //     message: "All Products Get",
  //     products,
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send({
  //     success: false,
  //     message: "Error in Getting Products",
  //     error,
  //   });
  // }
};

export const GetProductsBySubCatIdController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res.status(404).json({ error: true, success: false });
    }
    const product = await ProductModel.find({
      subCatId: req.params.id,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      // .select("-photo")
      .limit(perPage)
      .exec();
    // .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalPages: totalPages,
      message: "All Products Get",
      products: product,
      page: page,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Getting Products",
      error,
    });
  }
  // try {
  //   const products = await ProductModel.find({})
  //     // .populate("category")
  //     .select("-photo")
  //     .limit(12)
  //     // .sort({ createdAt: -1 });
  //   res.status(200).send({
  //     success: true,
  //     total: products.length,
  //     message: "All Products Get",
  //     products,
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send({
  //     success: false,
  //     message: "Error in Getting Products",
  //     error,
  //   });
  // }
};
export const GetProductsBySubCatName = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res.status(404).json({ error: true, success: false });
    }

    const product = await ProductModel.find({
      subCatName: req.query.subCatName,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      // .select("-photo")
      .limit(perPage)
      .exec();
    // .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalPages: totalPages,
      message: "All Products Get",
      products: product,
      page: page,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Getting Products",
      error,
    });
  }
  // try {
  //   const products = await ProductModel.find({})
  //     // .populate("category")
  //     .select("-photo")
  //     .limit(12)
  //     // .sort({ createdAt: -1 });
  //   res.status(200).send({
  //     success: true,
  //     total: products.length,
  //     message: "All Products Get",
  //     products,
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send({
  //     success: false,
  //     message: "Error in Getting Products",
  //     error,
  //   });
  // }
};
export const GetProductsByRating = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage);
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages) {
      return res.status(404).json({ error: true, success: false });
    }

    const product = await ProductModel.find({
      rating: req.query.rating,
      catId: req.query.catId,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      // .select("-photo")
      .limit(perPage)
      .exec();
    // .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalPages: totalPages,
      message: "All Products Get",
      products: product,
      page: page,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Getting Products",
      error,
    });
  }
  // try {
  //   const products = await ProductModel.find({})
  //     // .populate("category")
  //     .select("-photo")
  //     .limit(12)
  //     // .sort({ createdAt: -1 });
  //   res.status(200).send({
  //     success: true,
  //     total: products.length,
  //     message: "All Products Get",
  //     products,
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send({
  //     success: false,
  //     message: "Error in Getting Products",
  //     error,
  //   });
  // }
};
export const GetAllProductsByPrice = async (req, res) => {
  let productList = [];
  if (req.query.catId !== "" && req.query.catId !== undefined) {
    const productListArr = await ProductModel.find({
      catId: req.query.catId,
    }).populate("category");
    productList = productListArr;
  }
  if (req.query.subCatId !== "" && req.query.subCatId !== undefined) {
    const productListArr = await ProductModel.find({
      subCatId: req.query.subCatId,
    }).populate("category");
    productList = productListArr;
  }
  const filteredProducts = productList.filter((product) => {
    if (req.query.minPrice && product.price < parseInt(+req.query.minPrice)) {
      return false;
    }
    if (req.query.maxPrice && product.price > parseInt(+req.query.maxPrice)) {
      return false;
    }
    return true;
  });
  return res.status(200).json({
    product: filteredProducts,
    totalPages: 0,
    page: 0,
  });
};
// export const DeleteMultipleProductsController = async (req, res) => {
//   try {
//     const { ids } = req.body;

//     // ✅ Validation
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Please provide product IDs",
//       });
//     }

//     // ✅ Get products
//     const products = await ProductModel.find({ _id: { $in: ids } });

//     // 🔥 Helper → Extract Cloudinary public_id
//     const getPublicId = (url) => {
//       try {
//         const parts = url.split("/");
//         const fileWithExt = parts.pop(); // abc.jpg
//         const fileName = fileWithExt.split(".")[0];

//         const uploadIndex = parts.indexOf("upload");
//         const folderPath = parts.slice(uploadIndex + 1).join("/");

//         return folderPath ? `${folderPath}/${fileName}` : fileName;
//       } catch {
//         return null;
//       }
//     };

//     // ✅ Delete Images from Cloudinary
//     for (const product of products) {
//       if (!product?.images) continue;

//       for (const imgUrl of product.images) {
//         const publicId = getPublicId(imgUrl);

//         if (publicId) {
//           try {
//             await cloudinary.uploader.destroy(publicId);
//           } catch (err) {
//             console.log("Cloudinary Error:", err.message);
//           }
//         }
//       }
//     }

//     // ✅ Delete Products from DB
//     await ProductModel.deleteMany({ _id: { $in: ids } });

//     return res.status(200).json({
//       success: true,
//       error: false,
//       message: "Products & Images Deleted Successfully!",
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: error.message || "Server Error",
//     });
//   }
// }

export const GetProductsCount = async (req, res) => {
  try {
    const productsCount = await ProductModel.countDocuments();
    if (!productsCount) {
      res.status(500).json({
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      error: false,
      success: true,
      productCount: productsCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};
export const GetFeatureProducts = async (req, res) => {
  try {
    const product = await ProductModel.find({
      isFeatured: true,
    }).populate("category");
    res.status(200).send({
      success: true,
      message: "Features Products",
      products: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};
export const DeleteProductsController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "category",
    );
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
        error: true,
        success: false,
      });
    }
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
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product image not deleted",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      error: false,
      message: "Products Deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Products ",
      error,
    });
  }
};
export const getSingleProducts = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      slug: req.params.slug,
    }).populate("category");
    // const product = await ProductModel.findById(req.params.id).populate('category')
    if (!product) {
      return res.status(404).json({
        message: "The Product is not found",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      error: false,
      success: true,
      product: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
// export const updatedProduct = async (req, res) => {
//   try {
//     const product = await ProductModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name,
//         slug: req.body.name
//           ? slugify(req.body.name, { lower: true })
//           : product.slug,
//         description: req.body.description,
//         images: imagesArr,
//         price: req.body.price,
//         catName: req.body.catName,
//         category: req.body.category,
//         isFeatured: req.body.isFeatured,
//         variations: req.body.variations || [],
//         seo: {
//           metaTitle: req.body.seoTitle || req.body.name,
//           metaDescription: req.body.seoDescription || req.body.description,
//           keywords: req.body.seoKeywords || [],
//         },
//       },
//       { new: true },
//     );
//     if (!product) {
//       res.status(404).json({
//         message: "The Product can not be Upadetd!",
//         success: false,
//         error: true,
//       });
//     }
//     imagesArr = [];
//     return res.status(200).json({
//       message: "The Products is Updated",
//       error: false,
//       success: true,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };
export const updatedProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        catName: req.body.catName,
        category: req.body.category,
        isFeatured: req.body.isFeatured,
        images: req.body.images,

        // ✅ FORCE UPDATE variations
        variation: req.body.variation,

        seo: req.body.seo,
      },
      { new: true },
    );

    res.json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const filters = async(req,res)=>{
  const {category,minPrice,maxPrice,page,limit}= req.body
  const filters = {}
  if (category?.length) {
    filters.category = {$in:category}
  }
  if (minPrice || maxPrice) {
    filters.price = {$gte:+minPrice || 0,$lte:+maxPrice || Infinity}
  }
  try {
    const products = await ProductModel.find(filters).populate("category").skip((page - 1) * limit).limit(parseInt(limit));
    const total = await ProductModel.countDocuments(filters)
    return res.status(200).json({
      error:false,
      success:true,
      products:products,
      total:total,
      page:parseInt(page),
      totalPages:Math.ceil(total / limit)
    })
  } catch (error) {
    return res.status(500).json({message:error.message || error,error:true,success:false})
  }
}
// export const filters = async (req, res) => {
//   const { minPrice, maxPrice, page, limit, category } = req.body;
//   const filters = {};
//   if (category?.length) {
//     filters.category = { $in: category };
//   }
//   if (minPrice || maxPrice) {
//     filters.price = { $gte: +minPrice || 0, $lte: +maxPrice || Infinity };
//   }
//   try {
//     const product = await ProductModel.find(filters)
//       .populate("category")
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit));
//     const total = await ProductModel.countDocuments(filters);
//     return res.status(200).json({
//       success: true,
//       total: total,
//       page: page,
//       totalPages: Math.ceil(total / limit),
//       message: "Filtered Products",
//       product: product,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || "Internal Server Error",
//       success: false,
//       error: true,
//     });
//   }
// };
const sortItems = (products,sortBy,order)=>{
  return products.sort((a,b)=>{
    if(sortBy=='name'){
      return order === 'asc'?a.name.localeCompare(b.name):b.name.localeCompare(a.name)
    }
    if(sortBy === 'price'){
      return order === 'asc'? a.price - b.price: b.price-a.price
    }
    return 0
  })
}
export const sortBy = async (req, res) => {
  try {
    const {
      products = [],
      sortBy = "name",
      order = "asc",
    } = req.body;

    // Check products array
    if (!Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: "Products must be an array",
      });
    }

    // Sort Logic
    const sortedProducts = [...products].sort((a, b) => {

      let first = a[sortBy];
      let second = b[sortBy];

      // Handle string values
      if (typeof first === "string") {
        first = first.toLowerCase();
        second = second.toLowerCase();
      }

      // Ascending
      if (order === "asc") {
        return first > second ? 1 : -1;
      }

      // Descending
      return first < second ? 1 : -1;
    });

    return res.status(200).json({
      success: true,
      message: "Products Sorted Successfully",
      products: sortedProducts,
      page: 1,
      totalPages: 1,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};


// export const createProducts = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       brand,
//       images,
//       price,
//       oldPrice,
//       catName,
//       catId,
//       subCatId,
//       subCatName,
//       thirdsubCat,
//       thirdsubCatName,
//       thirdsubCatId,
//       countInStock,
//       rating,
//       isFeatured,
//       discount,
//       addons,
//       seoTitle,
//       seoDescription,
//       seoKeywords,
//     } = req.body;

//     // 🔴 BASIC VALIDATION
//     if (!name || !price || !catId) {
//       return res.status(400).json({
//         message: "Name, price, and category are required",
//         error: true,
//         success: false,
//       });
//     }

//     // 🟢 CREATE PRODUCT
//     const product = new ProductModel({
//       name,
//       slug: slugify(name,{ lower: true }),
//       description,
//       images: imagesArr, // images should be pushed before controller
//       brand,
//       price,
//       oldPrice,
//       catName,
//       catId,
//       subCatId,
//       subCatName,
//       thirdsubCat,
//       thirdsubCatName,
//       thirdsubCatId,
//       countInStock,
//       rating,
//       isFeatured,
//       discount,

//       // ✅ ADDONS
//       addons: addons || [],

//       // ✅ SEO
//       seo: {
//         title: seoTitle || name,
//         description: seoDescription || description,
//         keywords: seoKeywords || [],
//       },
//     });

//     const savedProduct = await product.save();
//     imagesArr = [];

//     if (!savedProduct) {
//       return res.status(500).json({
//         message: "Product not created",
//         error: true,
//         success: false,
//       });
//     }

//     return res.status(201).json({
//       message: "Product created successfully",
//       success: true,
//       error: false,
//       product: savedProduct,
//     });
//   } catch (error) {
//     console.error("Create Product Error:", error);
//     return res.status(500).json({
//       message: error.message || "Internal Server Error",
//       error: true,
//       success: false,
//     });
//   }
// };
