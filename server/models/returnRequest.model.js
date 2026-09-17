import mongoose from "mongoose";

const returnRequestSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      productTitle: { type: String, required: true },
      image: { type: String },
      quantity: { type: Number, default: 1 },
      price: { type: Number, default: 0 },
    },
    type: {
      type: String,
      enum: ["return", "exchange"],
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed", "cancelled"],
      default: "pending",
    },
    adminNote: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const ReturnRequestModel =
  mongoose.models.ReturnRequest ||
  mongoose.model("ReturnRequest", returnRequestSchema);

export default ReturnRequestModel;
