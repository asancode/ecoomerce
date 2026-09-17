// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Provide name"],
//     },
//     email: {
//       type: String,
//       required: [true, "Provide email"],
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: [true, "Provide password"],
//     },
//     avatar: {
//       type: String,
//       default: "",
//     },
//     mobile: {
//       type: Number,
//       default: null,
//     },
//     verify_email:{
//       type: Boolean,
//       default:false
//     },
//     refresh_token:{
//       type:String,
//       default:""
//     },
//     access_token:{
//       type:String,
//       default:""
//     },
//     // verify_email: {
//     //   type: Boolean,
//     //   default: false,
//     // },
//     // refresh_token: {
//     //   type: String,
//     //   default: "",
//     // },
//     last_login_date: {
//       type: Date,
//       default: "",
//     },
//     status: {
//       type: String,
//       enum: ["Active", "Inactive", "Suspended"],
//       default: "Active",
//     },
//     address_details: [
//       {
//         type: mongoose.Schema.ObjectId,
//         ref: "address",
//       },
//     ],
//     shopping_cart: [
//       {
//         type: mongoose.Schema.ObjectId,
//         ref: "carts",
//       },
//     ],
//     orderHistory: [
//       {
//         type: mongoose.Schema.ObjectId,
//         ref: "order",
//       },
//     ],
//     otp: {
//       type: String,
//     },
//     otpExpires: {
//       type: Date,
//     },
//     // forgot_password_otp:{
//     //     type:String,
//     //     default:null
//     // },
//     // forgot_password_expiry:{
//     //     type:Date,
//     //     default:""
//     // },
//     role: {
//       type: String,
//       enum: ["ADMIN", "USER"],
//       default: "USER",
//     },
//     googleSignup:{
//       type:Boolean,
//       default:false
//     }
//   },
//   {
//     timestamps: true,
//   }
// );
// const UserModel = mongoose.model("users", userSchema);
// export default UserModel;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide name"],
    },
    email: {
      type: String,
      required: [true, "Provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Provide password"],
    },
    avatar: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      default: null,
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    refresh_token: {
      type: String,
      default: "",
    },
    access_token: {
      type: String,
      default: "",
    },
    last_login_date: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    address_details: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "address",
      },
    ],
    shopping_cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "carts",
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "order",
      },
    ],
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    // role: {
    //   type: String,
    //   enum: ["admin", "user"],
    //   default: "user",
    // },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    googleSignup: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("users", userSchema);
export default UserModel;