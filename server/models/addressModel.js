// import mongoose from "mongoose";

// const addressSchema = new mongoose.Schema(
//   {
//     address_line1: {
//       type: String,
//       default: "",
//     },
//     city: {
//       type: String,
//       default: "",
//     },
//     state: {
//       type: String,
//       default: "",
//     },
//     pincode: {
//       type: String,
//     },
//     country: {
//       type: String,
//     },
//     mobile: {
//       type: Number,
//       default: null,
//     },
//     // status: {
//     //   type: Boolean,
//     //   default: true,
//     // },
//     landmark: {
//       type: String,
//     },
//     addressType: {
//       type: String,
//       enum: ["Home", "Office"],
//     },
//     userId: {
//       type: mongoose.Schema.ObjectId,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// const AddressModel = mongoose.model("address", addressSchema);
// export default AddressModel;
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address_line1: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    pincode: {
      type: String,
    },
    country: {
      type: String,
    },
    mobile: {
      type: Number,
      default: null,
    },
    // status: {
    //   type: Boolean,
    //   default: true,
    // },
    landmark: {
      type: String,
    },
    addressType: {
      type: String,
      enum: ["Home", "Office"],
    },
    // ✅ FIX: ye do fields pehle schema mein thi hi nahi — isiliye customer
    // ki location kabhi save hi nahi ho pa rahi thi, chahe frontend kuch
    // bhi bhejta ho. Ab address create/update controller mein inhe
    // req.body se bharna hoga (neeche wala controller template dekho).
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const AddressModel = mongoose.model("address", addressSchema);
export default AddressModel;