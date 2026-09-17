import mongoose from "mongoose";

const addOnSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: { type: Number },
});
const variantSchema = new mongoose.Schema({
  title: String,
  required: Boolean,
  options: [addOnSchema],
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      default: 0,
    },
    catName: {
      type: String,
      default: "",
    },
    sales: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    variation: [variantSchema],
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);
const ProductModel = mongoose.model("cartProduct", productSchema);
export default ProductModel;
