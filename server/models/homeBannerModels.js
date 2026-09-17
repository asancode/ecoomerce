import mongoose from "mongoose";

const homeBannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    images: {
      type: [String],
      required: true,
      default: [],
    },
    status: {
      type: String,
      default: "active",
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const HomeBanner = mongoose.model("HomeBanner", homeBannerSchema);

export default HomeBanner;