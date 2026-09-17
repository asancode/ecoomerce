import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      default: "",
    },
    userName: {
      type: String,
      default: "",
    },
    review:{
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    // userId: {
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref: "users",
    // },
    // productId: {
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref: "products",
    // },

    userId: {
      type: String,
      default: "",
    },
    productId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);
const ReviewModel = mongoose.model("reviews", reviewSchema);
export default ReviewModel;
