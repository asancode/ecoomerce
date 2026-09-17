import mongoose from "mongoose";
const cartSechema = mongoose.Schema(
  {
    productTitle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
     slug: {
      type: String,
      required: true,
    },
    catName: {
      type: String,
      default:""
    },
    variation: {
      type: mongoose.Schema.Types.Mixed, // ✅ Object bhi store hoga
      default: {},
    },
  },
  {
    timestamps: true,
  },
);
const CartModel = mongoose.model("cart", cartSechema);
export default CartModel;
