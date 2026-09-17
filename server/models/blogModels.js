import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
      },
    ],
     slug: {
      type: String,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  },
);
const BlogModel = mongoose.model("blogs", blogSchema);
export default BlogModel;
