import mongoose from "mongoose";

const adHomeBannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    images: {
      type: [String],
      required: true,
      default: [],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    textAlignment: { type: String, default: "left" },
    price: {
      type: Number,
      default: 0,
    },
    catName: {
      type: String,
      default: "",
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
  },
);

const AddHomeBanner = mongoose.model("AddHomeBanner", adHomeBannerSchema);

export default AddHomeBanner;
