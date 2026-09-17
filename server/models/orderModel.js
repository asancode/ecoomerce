// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.ObjectId,
//       ref: "users",
//     },
//     products: [
//       {
//         productId: {
//           type: String,
//         },
//         productTitle: {
//           type: String,
//         },
//         quantity: {
//           type: Number,
//         },
//         price: {
//           type: Number,
//         },
//         image: {
//           type: String,
//         },
//         subTotal: {
//           type: Number,
//         },
//         slug: {
//           type: String,
//           required: true,
//         },
//         catName: {
//           type: String,
//           default: "",
//         },
//         variation: {
//           type: mongoose.Schema.Types.Mixed, // ✅ Object bhi store hoga
//           default: {},
//         },
//       },
//     ],
//     paymentId: {
//       type: String,
//       default: "",
//     },
//     payment_status: {
//       type: String,
//       default: "",
//     },
//     order_status: {
//       type: String,
//       enum: [
//         "Pending",
//         "Confirmed",
//         "Preparing",
//         "Shipped",
//         "Delivered",
//         "Cancelled",
//       ],
//       default: "Pending",
//     },
//     orderId: {
//       type: String,
//       unique: true,
//     },
//     delivery_address: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "address",
//       required: true,
//     },
//      totalAmt: {
//       type: Number,
//     },
//     invoice_receipt: {
//       type: String,
//       default: "",
//     },
//     date:{
//       date: { type: String, default: "" },
//     }
//     // userId: {
//     //   type: mongoose.Schema.ObjectId,
//     //   ref: "User",
//     // },
//     // orderId: {
//     //   type: String,
//     //   required: [true, "Provide orderId"],
//     // },
//     // addons: [
//     //   {
//     //     name: String,
//     //     price: Number,
//     //   },
//     // ],
//     // productId: {
//     //   type: mongoose.Schema.ObjectId,
//     //   ref: "product",
//     // },
//     // product_details: {
//     //   name: String,
//     //   image: Array,
//     // },
//     // paymentId: {
//     //   type: String,
//     //   default: "",
//     // },
//     // payment_status: {
//     //   type: String,
//     //   default: "",
//     // },
//     // delivery_address: {
//     //   type: mongoose.Schema.ObjectId,
//     //   ref: "address",
//     // },
//     // subTotalAmt: {
//     //   type: Number,
//     //   default: 0,
//     // },
//     // taxRate: {
//     //   type: Number,
//     //   default: 0, // e.g. 5%, 12%, 18%
//     // },
//     // taxAmount: {
//     //   type: Number,
//     //   default: 0,
//     // },

//     // shippingPrice: {
//     //   type: Number,
//     //   default: 0,
//     // },
//     // totalAmt: {
//     //   type: Number,
//     //   default: 0,
//     // },
//     // invoice_receipt: {
//     //   type: String,
//     //   default: "",
//     // },
//   },
//   {
//     timestamps: true,
//   },
// );
// const OrderModel = mongoose.model("order", orderSchema);
// export default OrderModel;
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    orderId: {
      type: String,
      unique: true,
    },
    products: [
      {
        productId: { type: String },
        productTitle: { type: String },
        quantity: { type: Number },
        price: { type: Number },
        image: { type: String },
        subTotal: { type: Number },
        slug: { type: String, required: true },
        catName: { type: String, default: "" },
        variation: {
          type: mongoose.Schema.Types.Mixed,
          default: {},
        },
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["card", "cod"],
    },
    paymentId: {
      type: String,
      default: "",
    },
    payment_status: {
      type: String,
      default: "",
    },
    // ✅ Single source of truth — controller aur frontend dono
    // isi exact field name/enum ka istemal karte hain
    order_status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Preparing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
    delivery_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },
    totalAmt: {
      type: Number,
    },
    invoice_receipt: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },

    // ✅ Live tracking ke liye
    deliveryAgent: {
      name: { type: String },
      mobile: { type: String },
    },
    deliveryLocation: {
      latitude: { type: Number },
      longitude: { type: Number },
      updatedAt: { type: Date },
    },
    shopLocation: {
      latitude: Number,
      longitude: Number,
      address: String,
    },
    pickupLocation: {
      latitude: Number,
      longitude: Number,
      updatedAt: Date,
    },
    riderLocation: {
      latitude: Number,
      longitude: Number,
      updatedAt: Date,
    },
  },
  { timestamps: true },
);

const OrderModel = mongoose.model("order", orderSchema);
export default OrderModel;
