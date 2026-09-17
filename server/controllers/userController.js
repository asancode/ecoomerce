// // import userModel from "../models/userModel.js";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";
// import sendEmailFun from "../Config/sendEmail.js";
// import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
// import generateAccessToken from "../utils/generatedAccessToken.js";
// import generateRefreshToken from "../utils/generatedRefreshToken.js";
// import fs from "fs";
// import { v2 as cloudinary } from "cloudinary";
// import UserModel from "../models/userModel.js";
// import ReviewModel from "../models/reviewsModel.js";
// import ProductModel from "../models/productModel.js";
// // import uploads from '../middlewares/multer.js';
// // import uploads from '../middlewares/multer.js';

// cloudinary.config({
//   cloud_name: process.env.CLOUINARY_NAME,
//   api_key: process.env.CLOUINARY_API_KEY,
//   api_secret: process.env.CLOUINARY_SECRET,
// });

// export const registerUserController = async (req, res) => {
//   try {
//     let user;
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         message: "provide email,name,password",
//         error: true,
//         success: false,
//       });
//     }
//     user = await UserModel.findOne({ email: email });
//     if (user) {
//       return res.json({
//         message: "User Already Register email",
//         error: true,
//         success: false,
//       });
//     }
//     const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
//     const salt = await bcryptjs.genSalt(10);
//     const hashPassword = await bcryptjs.hash(password, salt);
//     // const payload = {
//     //     name,email,password:hashPassword
//     // }
//     // const newUser = new userModel(payload)
//     user = new UserModel({
//       email: email,
//       password: hashPassword,
//       name: name,
//       otp: verifyCode,
//       otpExpires: Date.now() + 60000,
//     }).save();

//     await sendEmailFun({
//       to: email,
//       subject: "Verify email from Teyyar Cake",
//       text: "",
//       html: verifyEmailTemplate({ name, verifyCode }),
//     });

//     const token = jwt.sign(
//       { email: user.email, id: user._id },
//       process.env.JSON_SECRET_KEY,
//     );
//     return res.status(200).json({
//       success: true,
//       error: false,
//       message: "User Registered Successfully! Please verify your email.",
//       token: token,
//     });

//     // const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`
//     // const verifyEmail = await sendEmail({
//     //     sentTo : email,
//     //     subject :"Verify email from binkeyit",
//     //     html:verifyEmailTemplate({
//     //         name,
//     //         url:verifyEmailUrl
//     //     })
//     // })
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

// export const verifyEmailController = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await UserModel.findOne({ email: email });
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         error: true,
//         success: false,
//       });
//     }
//     const isCodeValid = user.otp === otp;
//     const isNotExpired = user.otpExpires >= Date.now();
//     if (isCodeValid && isNotExpired) {
//       user.verify_email = true;
//       user.otp = null;
//       user.otpExpires = null;
//       await user.save();
//       return res.status(200).json({
//         message: "Email verified successfully",
//         error: false,
//         success: true,
//       });
//     } else if (!isCodeValid) {
//       return res.status(400).json({
//         message: "Invalid OTP code",
//         error: true,
//         success: false,
//       });
//     } else {
//       return res.status(400).json({
//         message: "OTP code has expired",
//         error: true,
//         success: false,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };
// // export const authWithGoogle = async (req, res) => {
// //   const { name, email, avatar, mobile, googleSignup, password, role } =
// //     req.body;
// //   try {
// //     const existingUser = await UserModel.findOne({ email: email });
// //     if (existingUser) {
// //       const user = await UserModel.create({
// //         name: name,
// //         email: email,
// //         avatar: avatar,
// //         mobile: mobile,
// //         password: "null",
// //         role: role,
// //         verify_email: true,
// //         googleSignup: true,
// //       });
// //       await user.save();
// //       const refreshToken = await generateRefreshToken(user?._id);
// //       const accessToken = await generateAccessToken(user?._id);

// //       await UserModel.findByIdAndUpdate(user?._id, {
// //         last_login_date: Date.now(),
// //       });
// //       res.cookie("accessToken", accessToken);
// //       res.cookie("refreshToken", refreshToken);
// //       return res.json({
// //         message: "Login Successful",
// //         error: false,
// //         success: true,
// //         accessToken,
// //         refreshToken,
// //       });
// //     } else {
// //       const refreshToken = await generateRefreshToken(existingUser?._id);
// //       const accessToken = await generateAccessToken(existingUser?._id);

// //       await UserModel.findByIdAndUpdate(existingUser?._id, {
// //         last_login_date: Date.now(),
// //       });
// //       res.cookie("accessToken", accessToken);
// //       res.cookie("refreshToken", refreshToken);
// //       return res.json({
// //         message: "Signup Successful",
// //         error: false,
// //         success: true,
// //         accessToken,
// //         refreshToken,
// //       });
// //     }
// //   } catch (error) {
// //     return res.status(500).json({
// //       message: error.message || error,
// //       error: true,
// //       success: false,
// //     });
// //   }
// // };
// export const authWithGoogle = async (req, res) => {
//   const { name, email, avatar, mobile, googleSignup, password, role } = req.body;
  
//   try {
//     const existingUser = await UserModel.findOne({ email: email });

//     // ✅ User already exists → Login
//     if (existingUser) {
//       const refreshToken = await generateRefreshToken(existingUser._id);
//       const accessToken = await generateAccessToken(existingUser._id);

//       await UserModel.findByIdAndUpdate(existingUser._id, {
//         last_login_date: Date.now(),
//       });

//       res.cookie("accessToken", accessToken);
//       res.cookie("refreshToken", refreshToken);

//       return res.json({
//         message: "Login Successful",
//         error: false,
//         success: true,
//         accessToken,
//         refreshToken,
//       });
//     } 
    
//     // ✅ User nahi mila → Signup (naya user banao)
//     else {
//       const user = await UserModel.create({
//         name: name,
//         email: email,
//         avatar: avatar,
//         mobile: mobile,
//         password: "null",
//         role: role,
//         verify_email: true,
//         googleSignup: true,
//       });

//       const refreshToken = await generateRefreshToken(user._id);
//       const accessToken = await generateAccessToken(user._id);

//       await UserModel.findByIdAndUpdate(user._id, {
//         last_login_date: Date.now(),
//       });

//       res.cookie("accessToken", accessToken);
//       res.cookie("refreshToken", refreshToken);
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };
// export const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await UserModel.findOne({ email: email });
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         error: true,
//         success: false,
//       });
//     }
//     if (user.status !== "Active") {
//       return res.status(403).json({
//         message: "User account is not active",
//         error: true,
//         success: false,
//       });
//     }
//     if (user.verify_email !== true) {
//       return res.status(403).json({
//         message: "Your email is not verified yet please verify your email",
//         error: true,
//         success: false,
//       });
//     }
//     const checkPassword = await bcryptjs.compare(password, user.password);
//     if (!checkPassword) {
//       return res.status(400).json({
//         message: "Contact to admin",
//         error: true,
//         success: false,
//       });
//     }

//     const refreshToken = await generateRefreshToken(user?._id);
//     const accessToken = await generateAccessToken(user?._id);
//     // const updateUser = await userModel.updateOne({id:user._id}, {
//     //   last_login_date: Date.now(),
//     // });
//     const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
//       last_login_date: Date.now(),
//     });
//     // const cookieOption = {
//     //   httpOnly: true,
//     //   secure: true,
//     //   sameSite: "None",
//     // };
//     // res.cookie("accessToken", accessToken, cookieOption);
//     // res.cookie("refreshToken", refreshToken, cookieOption);
//     // res.cookie("accessToken", accessToken, { httpOnly: true });
//     // res.cookie("refreshToken", refreshToken, { httpOnly: true });
//     res.cookie("accessToken", accessToken);
//     res.cookie("refreshToken", refreshToken);
//     return res.json({
//       message: "Login successful",
//       error: false,
//       success: true,
//       accessToken,
//       refreshToken,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };
// export const logoutController = async (req, res) => {
//   try {
//     const userid = req.userId;
//     // const cookieOption = {
//     //   httpOnly: true,
//     //   secure: true,
//     //   sameSite: "None",
//     // };
//     const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
//       refresh_token: "",
//       // access_token: "",
//     });
//     res.clearCookie("accessToken");
//     res.clearCookie("refreshToken");
//     // res.clearCookie("accessToken", cookieOption);
//     // res.clearCookie("refreshToken", cookieOption);
//     return res.json({
//       message: "Logout successful",
//       error: false,
//       success: true,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

// var imagesArr = [];
// export const userAvatarController = async (req, res) => {
//   try {
//     imagesArr = [];
//     const userId = req.userId;
//     const image = req.files;
//     const user = await UserModel.findOne({ _id: userId });
//     // if (!user) {
//     //   return res.status(401).json({
//     //     message: "Unauthorized",
//     //     error: true,
//     //     success: false,
//     //   });
//     // }

//     const imgURL = user?.avatar;
//     const urlArr = imgURL.split("/");
//     const avatar_imgName = urlArr[urlArr.length - 1];
//     const imageName = avatar_imgName.split(".")[0];
//     if (imageName) {
//       const res = await cloudinary.uploader.destroy(
//         imageName,
//         (error, result) => {},
//       );
//     }

//     // console.log(image)
//     const options = {
//       user_filename: true,
//       unique_filename: false,
//       overwrite: true,
//     };
//     for (let i = 0; i < image?.length; i++) {
//       const img = await cloudinary.uploader.upload(
//         image[i].path,
//         options,
//         //     imagesArr.push(img.secure_url)
//         // fs.unlinkSync(`uploads/${req.files[i].filename}`)
//         function (error, result) {
//           // console.log(result);
//           imagesArr.push(result.secure_url);
//           fs.unlinkSync(`uploads/${image[i].filename}`);
//           // console.log(image[i].filename);
//         },
//       );
//     }
//     user.avatar = imagesArr[0];
//     user.save();
//     return res.status(200).json({
//       _id: userId,
//       avatar: imagesArr[0],
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || "Internal Server Error",
//       error: true,
//       success: false,
//     });
//   }
// };

// export const removeAvatarController = async (request, response) => {
//   const imgURL = request.query.img;
//   const urlArr = imgURL.split("/");
//   const imgName = urlArr[urlArr.length - 1];
//   const imageName = imgName.split(".")[0];
//   if (imageName) {
//     const res = await cloudinary.uploader.destroy(
//       imageName,
//       (error, result) => {},
//     );
//     if (res) {
//       response.status(200).send(res);
//     }
//   }
// };

// // update user dateils
// export const updateUserDetailsController = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { name, email, mobile, password } = req.body;
//     const userExist = await UserModel.findById(userId);
//     if (!userExist) {
//       return res.status(404).send("The user cannot be Updated");
//     }
//     let verifyCode = "";
//     if (email !== userExist.email) {
//       verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
//     }
//     let hashPassword = "";
//     if (password) {
//       const salt = await bcryptjs.genSalt(10);
//       hashPassword = await bcryptjs.hash(password, salt);
//     } else {
//       hashPassword = userExist.password;
//     }
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       userId,
//       {
//         name: name,
//         email: email,
//         verify_email: email !== userExist.email ? false : true,
//         mobile: mobile,
//         password: hashPassword,
//         otp: verifyCode !== "" ? verifyCode : null,
//         otpExpires: verifyCode !== "" ? Date.now() + 60000 : "",
//       },
//       { new: true },
//     );
//     if (email !== userExist.email) {
//       await sendEmailFun({
//         to: email,
//         subject: "Verify email from Teyyar Cake",
//         text: "",
//         html: verifyEmailTemplate({ name, verifyCode }),
//       });
//     }
//     return res.status(200).json({
//       message: "User details updated successfully",
//       error: false,
//       success: true,
//       user: {
//         name: updatedUser.name,
//         _id: updatedUser._id,
//         email: updatedUser.email,
//         mobile: updatedUser.mobile,
//         avatar: updatedUser.avatar,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || "Internal Server Error",
//       error: true,
//       success: false,
//     });
//   }
// };

// // forgot password not login
// export const forgotPasswordController = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await UserModel.findOne({ email: email });
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         error: true,
//         success: false,
//       });
//     } else {
//       let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
//       user.otp = verifyCode;
//       user.otpExpires = Date.now() + 60000;
//       await user.save();
//       await sendEmailFun({
//         to: email,
//         subject: "Verify email from Teyyar Cake",
//         text: "",
//         html: verifyEmailTemplate({ name: user?.name, verifyCode }),
//       });
//       return res.json({
//         message: "check your email ",
//         error: false,
//         success: true,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };
// export const verifyForgotPasswordOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await UserModel.findOne({ email: email });
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         error: true,
//         success: false,
//       });
//     }
//     if (!email || !otp) {
//       return res.status(400).json({
//         message: "Provide required fields email and otp",
//         error: true,
//         success: false,
//       });
//     }
//     if (otp !== user.otp) {
//       return res.status(400).json({
//         message: "Invalid OTP",
//         error: true,
//         success: false,
//       });
//     }
//     const currentTime = Date.now().toString();
//     if (user.otpExpires < currentTime) {
//       return res.status(400).json({
//         message: "OTP expired",
//         error: true,
//         success: false,
//       });
//     }
//     user.otp = "";
//     user.otpExpires = "";
//     await user.save();
//     return res.status(200).json({
//       message: "OTP verified successfully",
//       error: false,
//       success: true,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

// //reset password
// export const resetPasswordController = async (req, res) => {
//   try {
//     const { email, oldPassword, newPassword, confirmPassword } = req.body;
//     if (!email || !newPassword || !confirmPassword) {
//       return res.status(400).json({
//         message: "Provide all required fields",
//       });
//     }
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         message: "Email not found",
//         error: true,
//         success: false,
//       });
//     }
// if (user?.googleSignup===false) {
//   const checkPassword = await bcryptjs.compare(oldPassword, user?.password);
//     if (!checkPassword) {
//       return res.status(400).json({
//         message: "Old password is incorrect",
//         error: true,
//         success: false,
//       });
//     }
// }
//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({
//         message: "Password and confirm password do not match",
//         error: true,
//         success: false,
//       });
//     }
//     const salt = await bcryptjs.genSalt(10);
//     const hashPassword = await bcryptjs.hash(newPassword, salt);
//     user.password = hashPassword;
//     user.googleSignup=false;
//     await user.save();
//     // const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
//     //   password: hashPassword,
//     //   googleSignup:false
//     // });

//     return res.status(200).json({
//       message: "Password reset successfully",
//       error: false,
//       success: true,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

// // refresh token
// export const refreshTokenController = async (req, res) => {
//   try {
//     const refreshToken =
//       req.cookies.refreshToken || req?.hearder?.authorization?.split(" ")[1];
//     if (!refreshToken) {
//       return res.status(401).json({
//         message: "No refresh token provided",
//         error: true,
//         success: false,
//       });
//     }
//     const verifyToken = await jwt.verify(
//       refreshToken,
//       process.env.REFRESH_SECRET_KEY,
//     );
//     if (!verifyToken) {
//       return res.status(401).json({
//         message: "token is expried",
//         error: true,
//         success: false,
//       });
//     }
//     const userId = verifyToken._id;
//     const newAccessToken = await generateAccessToken(userId);
//     const cookieOption = {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//     };
//     res.cookie("accessToken", newAccessToken, cookieOption);
//     return res.json({
//       message: "New access token generated",
//       error: false,
//       success: true,
//       data: {
//         accessToken: newAccessToken,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

// export const userDetails = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const user = await UserModel.findById(userId)
//       .select("-password -otp -refresh_token")
//       .populate("address_details");
//     return res.status(200).json({
//       message: "User details fetched successfully",
//       error: false,
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

// // review controller
// export const addReviewController = async (req, res) => {
//   try {
//     const {image, userName, review, rating, userId, productId} = req.body;
//     const userReview = new ReviewModel({
//       images: image,
//       userName: userName,
//       review: review,
//       rating: rating,
//       userId: userId,
//       productId: productId,
//     });
//     await userReview.save();
//     return res.status(200).json({
//       message: "Review added successfully",
//       error: false,
//       success: true,
//       data: userReview,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
//   }
//   // get review controller
//   export const getReviewsIdController = async (req, res) => {
//     try {
//       const productId = req.query.productId;
//       const reviews = await ReviewModel.find({ productId: productId });
//       if (!reviews) {
//         return res.status(404).json({
//           error: true,
//           success: false,
//         });
//       }
//       return res.status(200).json({
//         error: false,
//         success: true,
//         reviews: reviews,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         message: error.message || error,
//         error: true,
//         success: false,
//       });
//     }
//   }
//   export const getReviewsController = async (req, res) => {
//   try {
//     const { slug } = req.params; // ✅ params se lo

//     // ✅ Pehle slug se product dhundo
//     const product = await ProductModel.findOne({ slug: slug });

//     if (!product) {
//       return res.status(404).json({
//         error: true,
//         success: false,
//         message: "Product nahi mila",
//       });
//     }

//     // ✅ Product _id se reviews dhundo
//     const reviews = await ReviewModel.find({ 
//       productId: product._id.toString() 
//     }).sort({ createdAt: -1 }); // ✅ Naye pehle

//     // ✅ Empty ho to bhi 200 do
//     if (!reviews || reviews.length === 0) {
//       return res.status(200).json({
//         error: false,
//         success: true,
//         reviews: [],
//         reviewsCount: 0,
//       });
//     }

//     return res.status(200).json({
//       error: false,
//       success: true,
//       reviews: reviews,
//       reviewsCount: reviews.length, // ✅ Count bhi bhejo
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };

// // export const getAllUsersController = async (req, res) => {
// //   try {
// //     const users = await UserModel.find()
// //       .select("-password")
// //       .sort({ createdAt: -1 });

// //     return res.status(200).json({
// //       success: true,
// //       error: false,
// //       data: users,
// //     });
// //   } catch (error) {
// //     console.error("Get users error:", error);

// //     return res.status(500).json({
// //       success: false,
// //       error: true,
// //       message: error.message || "Failed to get users",
// //     });
// //   }
// // };
// // // ============================================================
// // // UPDATE USER ROLE - ADMIN
// // // PUT /api/user/:userId/role
// // // Body: { role: "admin" }
// // // ============================================================

// // // export const updateUserRoleController = async (req, res) => {
// // //   try {
// // //     const { userId } = req.params;
// // //     const { role } = req.body;

// // //     if (!["user", "admin"].includes(role)) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         error: true,
// // //         message: "Role must be either 'user' or 'admin'",
// // //       });
// // //     }

// // //     const user = await UserModel.findById(userId);

// // //     if (!user) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         error: true,
// // //         message: "User not found",
// // //       });
// // //     }

// // //     // Prevent admin from changing their own role
// // //     if (req.userId === userId) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         error: true,
// // //         message: "You cannot change your own role",
// // //       });
// // //     }

// // //     user.role = role;

// // //     await user.save();

// // //     const safeUser = await UserModel.findById(userId)
// // //       .select("-password");

// // //     return res.status(200).json({
// // //       success: true,
// // //       error: false,
// // //       message: `User role changed to ${role}`,
// // //       data: safeUser,
// // //     });
// // //   } catch (error) {
// // //     console.error("Update user role error:", error);

// // //     return res.status(500).json({
// // //       success: false,
// // //       error: true,
// // //       message: error.message || "Failed to update user role",
// // //     });
// // //   }
// // // };

// // export const updateUserRoleController = async (req, res) => {
// //   try {
// //     const { userId } = req.params;
// //     const { role } = req.body;

// //     // Validate role
// //     if (!["user", "admin"].includes(role)) {
// //       return res.status(400).json({
// //         success: false,
// //         error: true,
// //         message: "Role must be either 'user' or 'admin'",
// //       });
// //     }

// //     // Find selected user
// //     const user = await UserModel.findById(userId);

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         error: true,
// //         message: "User not found",
// //       });
// //     }

// //     // Prevent admin from changing their OWN role
// //     if (req.userId?.toString() === user._id.toString()) {
// //       return res.status(400).json({
// //         success: false,
// //         error: true,
// //         message: "You cannot change your own role",
// //       });
// //     }

// //     // Update role
// //     user.role = role;
// //     await user.save();

// //     const safeUser = await UserModel.findById(userId)
// //       .select("-password");

// //     return res.status(200).json({
// //       success: true,
// //       error: false,
// //       message: `User role changed to ${role} successfully`,
// //       data: safeUser,
// //     });

// //   } catch (error) {
// //     console.error("Update user role error:", error);

// //     return res.status(500).json({
// //       success: false,
// //       error: true,
// //       message: error.message || "Failed to update user role",
// //     });
// //   }
// // };
// // // ============================================================
// // // DELETE USER - ADMIN
// // // DELETE /api/user/:userId
// // // ============================================================

// // export const deleteUserController = async (req, res) => {
// //   try {
// //     const { userId } = req.params;

// //     if (req.userId === userId) {
// //       return res.status(400).json({
// //         success: false,
// //         error: true,
// //         message: "You cannot delete your own account",
// //       });
// //     }

// //     const user = await UserModel.findByIdAndDelete(userId);

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         error: true,
// //         message: "User not found",
// //       });
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       error: false,
// //       message: "User deleted successfully",
// //     });
// //   } catch (error) {
// //     console.error("Delete user error:", error);

// //     return res.status(500).json({
// //       success: false,
// //       error: true,
// //       message: error.message || "Failed to delete user",
// //     });
// //   }
// // };
// // //   export const getReviewsController = async (req, res) => {
// // //   try {
// // //     const productId = req.params.productId; // ✅ query → params

// // //     const reviews = await ReviewModel.find({ productId: productId });

// // //     if (!reviews || reviews.length === 0) { // ✅ Empty array bhi check karo
// // //       return res.status(404).json({
// // //         error: true,
// // //         success: false,
// // //         message: "No reviews found",
// // //       });
// // //     }

// // //     return res.status(200).json({
// // //       error: false,
// // //       success: true,
// // //       reviews: reviews, // ✅ data → reviews
// // //     });
// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       message: error.message || error,
// // //       error: true,
// // //       success: false,
// // //     });
// // //   }
// // // };

// // // export const updateUserDetailsController = async (req, res) => {
// // //   try {
// // //     const userId = req.userId;
// // //     const { name, email, mobile, password } = req.body;

// // //     const user = await UserModel.findById(userId);
// // //     if (!user) {
// // //       return res.status(404).json({
// // //         message: "User not found",
// // //         error: true,
// // //         success: false,
// // //       });
// // //     }

// // //     const updateData = {};
// // //     let verifyCode = null;
// // //     let isEmailChanged = false;

// // //     // Name
// // //     if (name) updateData.name = name;

// // //     // Mobile
// // //     if (mobile) updateData.mobile = mobile;

// // //     // Email change handling
// // //     if (email && email.toLowerCase() !== user.email) {
// // //       isEmailChanged = true;
// // //       verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

// // //       updateData.email = email.toLowerCase();
// // //       updateData.verify_email = false;
// // //       updateData.otp = verifyCode;
// // //       updateData.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
// // //     }

// // //     // Password update
// // //     if (password) {
// // //       const salt = await bcryptjs.genSalt(10);
// // //       updateData.password = await bcryptjs.hash(password, salt);
// // //     }

// // //     // Update user
// // //     const updatedUser = await UserModel.findByIdAndUpdate(
// // //       userId,
// // //       updateData,
// // //       { new: true }
// // //     );

// // //     // Send verification email if email changed
// // //     if (isEmailChanged) {
// // //       await sendEmailFun({
// // //           to: email,
// // //       subject: "Verify email from Teyyar Cake",
// // //       text: "",
// // //       html: verifyEmailTemplate({ name, verifyCode }),
// // //     });
// // //     }

// // //     return res.status(200).json({
// // //       message: "User details updated successfully",
// // //       error: false,
// // //       success: true,
// // //       user: updatedUser,
// // //     });
// // //   } catch (error) {
// // //     console.error("Update User Error:", error);
// // //     return res.status(500).json({
// // //       message: "Internal Server Error",
// // //       error: true,
// // //       success: false,
// // //     });
// // //   }
// // // };

// // // export const userAvatarController = async (req, res) => {
// // //   try {
// // //     const userId = req.userId;

// // //     if (!userId) {
// // //       return res.status(401).json({
// // //         message: "Unauthorized",
// // //         error: true,
// // //         success: false,
// // //       });
// // //     }

// // //     // Multer single file upload
// // //     if (!req.file) {
// // //       return res.status(400).json({
// // //         message: "Avatar image is required",
// // //         error: true,
// // //         success: false,
// // //       });
// // //     }

// // //     // Create image path
// // //     const avatarPath = `/uploads/${req.file.filename}`;

// // //     // Save avatar in database
// // //     await UserModel.findByIdAndUpdate(userId, {
// // //       avatar: avatarPath,
// // //     });

// // //     return res.status(200).json({
// // //       message: "Avatar uploaded successfully",
// // //       error: false,
// // //       success: true,
// // //       data: {
// // //         userId,
// // //         avatar: avatarPath,
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error("Avatar Upload Error:", error);
// // //     return res.status(500).json({
// // //       message: "Internal Server Error",
// // //       error: true,
// // //       success: false,
// // //     });
// // //   }
// // // };

// // // export const logoutController = async (req, res) => {
// // //   try {
// // //     const cookieOptions = {
// // //       httpOnly: true,
// // //       secure: true,
// // //       sameSite: "None",
// // //     };

// // //     // Clear cookies (MOST IMPORTANT)
// // //     res.clearCookie("accessToken", cookieOptions);
// // //     res.clearCookie("refreshToken", cookieOptions);

// // //     // If userId exists, remove refresh token from DB
// // //     if (req.userid) {
// // //       await userModel.findByIdAndUpdate(req.userid, {
// // //         refresh_token: "",
// // //       });
// // //     }

// // //     return res.status(200).json({
// // //       message: "Logout successful",
// // //       error: false,
// // //       success: true,
// // //     });

// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       message: error.message || "Internal Server Error",
// // //       error: true,
// // //       success: false,
// // //     });
// // //   }
// // // };

// // // export const userAvatarController = async (req, res) => {
// // //   try {
// // //     if (!req.file) {
// // //       return res.status(400).json({
// // //         message: "No file uploaded",
// // //         success: false,
// // //       });
// // //     }

// // //     return res.status(200).json({
// // //       message: "Avatar uploaded successfully",
// // //       file: req.file,
// // //       success: true,
// // //     });

// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       message: error.message,
// // //       success: false,
// // //     });
// // //   }
// // // };

// // // import userModel from "../models/userModel.js";
// // // import bcryptjs from "bcryptjs";
// // // import jwt from "jsonwebtoken";
// // // import sendEmailFun from "../Config/sendEmail.js";
// // // import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";

// // // export const registerUserController = async (req, res) => {
// // //   try {
// // //     const { name, email, password } = req.body;

// // //     // 1️⃣ Validation
// // //     if (!name || !email || !password) {
// // //       return res.status(400).json({
// // //         message: "Please provide name, email, and password",
// // //         error: true,
// // //         success: false,
// // //       });
// // //     }

// // //     // 2️⃣ Check existing user
// // //     const existingUser = await userModel.findOne({ email });
// // //     if (existingUser) {
// // //       return res.status(409).json({
// // //         message: "Email already registered",
// // //         error: true,
// // //         success: false,
// // //       });
// // //     }

// // //     // 3️⃣ Generate OTP
// // //     const verifyCode = Math.floor(100000 + Math.random() * 900000);

// // //     // 4️⃣ Hash password
// // //     const salt = await bcryptjs.genSalt(10);
// // //     const hashPassword = await bcryptjs.hash(password, salt);

// // //     // 5️⃣ Create user
// // //     const user = new userModel({
// // //       name,
// // //       email,
// // //       password: hashPassword,
// // //       otp: verifyCode,
// // //       otpExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
// // //     });

// // //     await user.save();

// // //     // 6️⃣ Send verification email ✅ FIXED
// // //     const emailResult = await sendEmailFun({
// // //       to : email,
// // //         subject :"Verify email from Teyyar Cake",
// // //         text:"",
// // //         html:verifyEmailTemplate(
// // //             name,verifyCode

// // //     //   "Verify your email - BinkeyIT",
// // //     //   `Your verification code is ${verifyCode}`,
// // //     //   verifyEmailTemplate(name, verifyCode)
// // //     )
// // //   });

// // //     if (!emailResult.success) {
// // //       return res.status(500).json({
// // //         message: "Failed to send verification email",
// // //         error: true,
// // //         success: false,
// // //       });
// // //     }

// // //     // 7️⃣ Generate JWT
// // //     const token = jwt.sign(
// // //       { id: user._id, email: user.email },
// // //       process.env.JSON_SECRET_KEY,
// // //       { expiresIn: "7d" }
// // //     );

// // //     // 8️⃣ Success response
// // //     return res.status(201).json({
// // //       success: true,
// // //       error: false,
// // //       message: "User registered successfully! Please verify your email.",
// // //       token,
// // //     });

// // //   } catch (error) {
// // //     console.error("Register Error:", error);
// // //     return res.status(500).json({
// // //       message: error.message || "Server error",
// // //       error: true,
// // //       success: false,
// // //     });
// // //   }
// // // };

// // // import userModel from "../models/userModel.js";
// // // import bcryptjs from "bcryptjs";
// // // import jwt from "jsonwebtoken";
// // // import sendEmailFun from "../Config/sendEmail.js";
// // // import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";

// // // export const registerUserController = async (req, res) => {
// // //   try {
// // //     const { name, email, password } = req.body;

// // //     // 1️⃣ Validation
// // //     if (!name || !email || !password) {
// // //       return res.status(400).json({
// // //         message: "Provide name, email, and password",
// // //         error: true,
// // //         success: false,
// // //       });
// // //     }

// // //     // 2️⃣ Check existing user
// // //     const existingUser = await userModel.findOne({ email });
// // //     if (existingUser) {
// // //       return res.status(409).json({
// // //         message: "Already registered email",
// // //         error: true,
// // //         success: false,
// // //       });
// // //     }

// // //     // 3️⃣ Generate OTP
// // //     const verifyCode = Math.floor(100000 + Math.random() * 900000);

// // //     // 4️⃣ Hash password
// // //     const salt = await bcryptjs.genSalt(10);
// // //     const hashPassword = await bcryptjs.hash(password, salt);

// // //     // 5️⃣ Create & save user ✅ FIXED
// // //     const user = new userModel({
// // //       name,
// // //       email,
// // //       password: hashPassword,
// // //       otp: verifyCode,
// // //       otpExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
// // //     });

// // //     await user.save();

// // //     // 6️⃣ Send verification email ✅ FIXED
// // //     const emailResult = await sendEmailFun({
// // //         to: email,
// // //         subject: "Verify email from Teyyar Cake",
// // //         text: "",
// // //         html: verifyEmailTemplate({name, verifyCode}),
// // //     }
// // //     //   email,
// // //     //   "Verify email from Teyyar Cake",
// // //     //   "",
// // //     //   verifyEmailTemplate({
// // //     //     name,
// // //     //     verifyCode,
// // //     //   })
// // //     );

// // //     if (!emailResult.success) {
// // //       return res.status(500).json({
// // //         message: "Email sending failed",
// // //         error: true,
// // //         success: false,
// // //       });
// // //     }

// // //     // 7️⃣ Generate token
// // //     const token = jwt.sign(
// // //       { email: user.email, id: user._id },
// // //       process.env.JSON_SECRET_KEY,
// // //       { expiresIn: "7d" }
// // //     );

// // //     // 8️⃣ Success response
// // //     return res.status(201).json({
// // //       success: true,
// // //       error: false,
// // //       message: "User Registered Successfully! Please verify your email.",
// // //       token,
// // //     });

// // //   } catch (error) {
// // //     console.error("Register Error:", error);
// // //     return res.status(500).json({
// // //       message: error.message || "Server error",
// // //       error: true,
// // //       success: false,
// // //     });
// // //   }
// // // };
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailFun from "../Config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generatedAccessToken.js";
import generateRefreshToken from "../utils/generatedRefreshToken.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import UserModel from "../models/userModel.js";
import ReviewModel from "../models/reviewsModel.js";
import ProductModel from "../models/productModel.js";

cloudinary.config({
  cloud_name: process.env.CLOUINARY_NAME,
  api_key: process.env.CLOUINARY_API_KEY,
  api_secret: process.env.CLOUINARY_SECRET,
});

// OTP validity window — was 60000 (1 min), bumped to 10 min so email delivery
// delays don't make the OTP expire before the user can even open their inbox.
const OTP_EXPIRY_MS = 10 * 60 * 1000;

export const registerUserController = async (req, res) => {
  try {
    let user;
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "provide email,name,password",
        error: true,
        success: false,
      });
    }
    user = await UserModel.findOne({ email: email });
    if (user) {
      return res.json({
        message: "User Already Register email",
        error: true,
        success: false,
      });
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // ✅ FIX: added `await` — this was missing before, so `user` was a
    // pending Promise (not the saved document) when used just below.
    user = await new UserModel({
      email: email,
      password: hashPassword,
      name: name,
      otp: verifyCode,
      otpExpires: Date.now() + OTP_EXPIRY_MS,
    }).save();

    // ✅ FIX: now checking the actual result instead of ignoring it.
    // If this fails (most common cause: EMAIL_PASS is not a Gmail App Password),
    // the user is told immediately instead of silently never receiving the OTP.
    const emailResult = await sendEmailFun({
      to: email,
      subject: "Verify email from Teyyar Cake",
      text: "",
      html: verifyEmailTemplate({ name, verifyCode }),
    });

    if (!emailResult.success) {
      console.error("Register: failed to send verification email:", emailResult.error);
      return res.status(201).json({
        success: true,
        error: false,
        message:
          "User registered, but the verification email could not be sent. Please try 'resend OTP' or contact support.",
        emailSent: false,
      });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JSON_SECRET_KEY,
    );
    return res.status(200).json({
      success: true,
      error: false,
      message: "User Registered Successfully! Please verify your email.",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const verifyEmailController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    const isCodeValid = user.otp === otp;
    const isNotExpired = user.otpExpires >= Date.now();
    if (isCodeValid && isNotExpired) {
      user.verify_email = true;
      user.otp = null;
      user.otpExpires = null;
      await user.save();
      return res.status(200).json({
        message: "Email verified successfully",
        error: false,
        success: true,
      });
    } else if (!isCodeValid) {
      return res.status(400).json({
        message: "Invalid OTP code",
        error: true,
        success: false,
      });
    } else {
      return res.status(400).json({
        message: "OTP code has expired",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const authWithGoogle = async (req, res) => {
  const { name, email, avatar, mobile, role } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });

    // User already exists → Login
    if (existingUser) {
      const refreshToken = await generateRefreshToken(existingUser._id);
      const accessToken = await generateAccessToken(existingUser._id);

      await UserModel.findByIdAndUpdate(existingUser._id, {
        last_login_date: Date.now(),
      });

      res.cookie("accessToken", accessToken);
      res.cookie("refreshToken", refreshToken);

      return res.json({
        message: "Login Successful",
        error: false,
        success: true,
        accessToken,
        refreshToken,
      });
    }

    // User not found → Signup
    const user = await UserModel.create({
      name: name,
      email: email,
      avatar: avatar,
      mobile: mobile,
      password: "null",
      role: role,
      verify_email: true,
      googleSignup: true,
    });

    const refreshToken = await generateRefreshToken(user._id);
    const accessToken = await generateAccessToken(user._id);

    await UserModel.findByIdAndUpdate(user._id, {
      last_login_date: Date.now(),
    });

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    // ✅ FIX: this branch never returned a response before, request would hang.
    return res.json({
      message: "Signup Successful",
      error: false,
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// export const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await UserModel.findOne({ email: email });
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         error: true,
//         success: false,
//       });
//     }
//     if (user.status !== "Active") {
//       return res.status(403).json({
//         message: "User account is not active",
//         error: true,
//         success: false,
//       });
//     }
//     if (user.verify_email !== true) {
//       return res.status(403).json({
//         message: "Your email is not verified yet please verify your email",
//         error: true,
//         success: false,
//       });
//     }
//     const checkPassword = await bcryptjs.compare(password, user.password);
//     if (!checkPassword) {
//       return res.status(400).json({
//         message: "Contact to admin",
//         error: true,
//         success: false,
//       });
//     }

//     const refreshToken = await generateRefreshToken(user?._id);
//     const accessToken = await generateAccessToken(user?._id);
//     await UserModel.findByIdAndUpdate(user?._id, {
//       last_login_date: Date.now(),
//     });

//     res.cookie("accessToken", accessToken);
//     res.cookie("refreshToken", refreshToken);
//     return res.json({
//       message: "Login successful",
//       error: false,
//       success: true,
//       accessToken,
//       refreshToken,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };
export const loginController = async (req, res) => {
  try {
    const { email, password, loginType = "user" } = req.body;

    // ----------------------------------------------------------
    // Validation
    // ----------------------------------------------------------
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        error: true,
        success: false,
      });
    }

    // Only these two login types are allowed
    if (!["user", "admin"].includes(loginType)) {
      return res.status(400).json({
        message: "Invalid login type",
        error: true,
        success: false,
      });
    }

    // ----------------------------------------------------------
    // Find user
    // ----------------------------------------------------------
    const user = await UserModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password",
        error: true,
        success: false,
      });
    }

    // ----------------------------------------------------------
    // Account status
    // ----------------------------------------------------------
    if (user.status !== "Active") {
      return res.status(403).json({
        message: "Your account is not active. Please contact admin.",
        error: true,
        success: false,
      });
    }

    // ----------------------------------------------------------
    // Email verification
    // ----------------------------------------------------------
    if (user.verify_email !== true) {
      return res.status(403).json({
        message:
          "Your email is not verified. Please verify your email first.",
        error: true,
        success: false,
      });
    }

    // ----------------------------------------------------------
    // ROLE CHECK
    // ----------------------------------------------------------
    // Admin login -> account MUST be admin
    if (loginType === "admin" && user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Only administrators can use this login.",
        error: true,
        success: false,
      });
    }

    // User login -> account MUST be user
    if (loginType === "user" && user.role !== "user") {
      return res.status(403).json({
        message:
          "This is an administrator account. Please use the admin login.",
        error: true,
        success: false,
      });
    }

    // ----------------------------------------------------------
    // Password check
    // ----------------------------------------------------------
    const checkPassword = await bcryptjs.compare(
      password,
      user.password
    );

    if (!checkPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
        error: true,
        success: false,
      });
    }

    // ----------------------------------------------------------
    // Generate tokens
    // ----------------------------------------------------------
    const refreshToken = await generateRefreshToken(user._id);
    const accessToken = await generateAccessToken(user._id);

    // ----------------------------------------------------------
    // Update last login
    // ----------------------------------------------------------
    await UserModel.findByIdAndUpdate(user._id, {
      last_login_date: Date.now(),
      refresh_token: refreshToken,
    });

    // ----------------------------------------------------------
    // Cookie options
    // ----------------------------------------------------------
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    // ----------------------------------------------------------
    // Response
    // ----------------------------------------------------------
    return res.status(200).json({
      message:
        loginType === "admin"
          ? "Admin login successful"
          : "Login successful",

      error: false,
      success: true,

      accessToken,
      refreshToken,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
export const logoutController = async (req, res) => {
  try {
    const userid = req.userId;
    await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.json({
      message: "Logout successful",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

var imagesArr = [];
export const userAvatarController = async (req, res) => {
  try {
    imagesArr = [];
    const userId = req.userId;
    const image = req.files;
    const user = await UserModel.findOne({ _id: userId });

    // ✅ FIX: guard against missing/empty avatar so this doesn't crash
    // for users who never uploaded one.
    if (user?.avatar) {
      const urlArr = user.avatar.split("/");
      const avatar_imgName = urlArr[urlArr.length - 1];
      const imageName = avatar_imgName.split(".")[0];
      if (imageName) {
        await cloudinary.uploader.destroy(imageName, () => {});
      }
    }

    const options = {
      user_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    for (let i = 0; i < image?.length; i++) {
      const img = await cloudinary.uploader.upload(image[i].path, options);
      imagesArr.push(img.secure_url);
      fs.unlinkSync(`uploads/${image[i].filename}`);
    }
    user.avatar = imagesArr[0];
    await user.save();
    return res.status(200).json({
      _id: userId,
      avatar: imagesArr[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export const removeAvatarController = async (request, response) => {
  try {
    const imgURL = request.query.img;
    const urlArr = imgURL.split("/");
    const imgName = urlArr[urlArr.length - 1];
    const imageName = imgName.split(".")[0];
    if (imageName) {
      const res = await cloudinary.uploader.destroy(imageName);
      return response.status(200).send(res);
    }
    return response.status(400).json({ message: "No image provided", error: true, success: false });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// update user details
export const updateUserDetailsController = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;
    const userExist = await UserModel.findById(userId);
    if (!userExist) {
      return res.status(404).send("The user cannot be Updated");
    }
    let verifyCode = "";
    if (email !== userExist.email) {
      verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    }
    let hashPassword = "";
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    } else {
      hashPassword = userExist.password;
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: name,
        email: email,
        verify_email: email !== userExist.email ? false : true,
        mobile: mobile,
        password: hashPassword,
        otp: verifyCode !== "" ? verifyCode : null,
        otpExpires: verifyCode !== "" ? Date.now() + OTP_EXPIRY_MS : "",
      },
      { new: true },
    );
    if (email !== userExist.email) {
      const emailResult = await sendEmailFun({
        to: email,
        subject: "Verify email from Teyyar Cake",
        text: "",
        html: verifyEmailTemplate({ name, verifyCode }),
      });
      if (!emailResult.success) {
        console.error("updateUserDetails: failed to send verification email:", emailResult.error);
      }
    }
    return res.status(200).json({
      message: "User details updated successfully",
      error: false,
      success: true,
      user: {
        name: updatedUser.name,
        _id: updatedUser._id,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

// forgot password (not logged in)
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = verifyCode;
    user.otpExpires = Date.now() + OTP_EXPIRY_MS;
    await user.save();

    // ✅ FIX: now checking the actual send result
    const emailResult = await sendEmailFun({
      to: email,
      subject: "Verify email from Teyyar Cake",
      text: "",
      html: verifyEmailTemplate({ name: user?.name, verifyCode }),
    });

    if (!emailResult.success) {
      console.error("forgotPassword: failed to send OTP email:", emailResult.error);
      return res.status(500).json({
        message: "Could not send OTP email. Please try again.",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "check your email",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const verifyForgotPasswordOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide required fields email and otp",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    if (otp !== user.otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    // ✅ FIX: compare number to number instead of number to string
    if (!user.otpExpires || user.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
        error: true,
        success: false,
      });
    }

    user.otp = "";
    user.otpExpires = "";
    await user.save();
    return res.status(200).json({
      message: "OTP verified successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// reset password
export const resetPasswordController = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Provide all required fields",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email not found",
        error: true,
        success: false,
      });
    }

    if (user?.googleSignup === false) {
      const checkPassword = await bcryptjs.compare(oldPassword, user?.password);
      if (!checkPassword) {
        return res.status(400).json({
          message: "Old password is incorrect",
          error: true,
          success: false,
        });
      }
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password do not match",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashPassword;
    user.googleSignup = false;
    await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// refresh token
export const refreshTokenController = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];
    if (!refreshToken) {
      return res.status(401).json({
        message: "No refresh token provided",
        error: true,
        success: false,
      });
    }
    const verifyToken = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    if (!verifyToken) {
      return res.status(401).json({
        message: "token is expired",
        error: true,
        success: false,
      });
    }
    const userId = verifyToken._id;
    const newAccessToken = await generateAccessToken(userId);
    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", newAccessToken, cookieOption);
    return res.json({
      message: "New access token generated",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const userDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId)
      .select("-password -otp -refresh_token")
      .populate("address_details");
    return res.status(200).json({
      message: "User details fetched successfully",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// review controllers
export const addReviewController = async (req, res) => {
  try {
    const { image, userName, review, rating, userId, productId } = req.body;
    const userReview = new ReviewModel({
      images: image,
      userName: userName,
      review: review,
      rating: rating,
      userId: userId,
      productId: productId,
    });
    await userReview.save();
    return res.status(200).json({
      message: "Review added successfully",
      error: false,
      success: true,
      data: userReview,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getReviewsIdController = async (req, res) => {
  try {
    const productId = req.query.productId;
    const reviews = await ReviewModel.find({ productId: productId });
    if (!reviews) {
      return res.status(404).json({
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      error: false,
      success: true,
      reviews: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getReviewsController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await ProductModel.findOne({ slug: slug });

    // if (!product) {
    //   return res.status(404).json({
    //     error: true,
    //     success: false,
    //     message: "Product nahi mila",
    //   });
    // }

    const reviews = await ReviewModel.find({
      productId: product._id.toString(),
    }).sort({ createdAt: -1 });

    if (!reviews || reviews.length === 0) {
      return res.status(200).json({
        error: false,
        success: true,
        reviews: [],
        reviewsCount: 0,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      reviews: reviews,
      reviewsCount: reviews.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getAllUsersController = async (req, res) => {
  try {
    const users = await UserModel.find()
      .select("-password -otp -otpExpires -refresh_token -access_token")
      .sort({ createdAt: -1 });
 
    return res.status(200).json({
      success: true,
      error: false,
      data: users,
    });
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to get users",
    });
  }
};
 
// ============================================================
// UPDATE USER ROLE — ADMIN
// PUT /api/user/:id/role
// Body: { role: "admin" | "user" }
//
// Works both directions: user -> admin and admin -> user.
// ============================================================
 
export const updateUserRoleController = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
 
    if (!role) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Role is required",
      });
    }
 
    const allowedRoles = ["user", "admin"];
    const normalizedRole = String(role).toLowerCase();
 
    if (!allowedRoles.includes(normalizedRole)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid role. Allowed roles: user, admin",
      });
    }
 
    // ✅ UserModel (not the undefined "User") — this was the
    // ReferenceError that made role updates fail with a 500.
    const user = await UserModel.findById(id);
 
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }
 
    // Prevent an admin from locking themselves out by demoting
    // their own account. Remove this block if you don't want
    // that restriction.
    if (req.userId?.toString() === user._id.toString()) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "You cannot change your own role",
      });
    }
 
    user.role = normalizedRole;
    await user.save();
 
    const safeUser = await UserModel.findById(id).select(
      "-password -otp -otpExpires -refresh_token -access_token",
    );
 
    return res.status(200).json({
      success: true,
      error: false,
      message: `User role updated to ${normalizedRole}.`,
      data: safeUser,
    });
  } catch (error) {
    console.error("Update user role error:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to update user role",
    });
  }
};
 
// ============================================================
// DELETE USER — ADMIN
// DELETE /api/user/:userId
// ============================================================
 
export const deleteUserController = async (req, res) => {
  try {
    const { userId } = req.params;
 
    if (req.userId === userId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "You cannot delete your own account",
      });
    }
 
    const user = await UserModel.findByIdAndDelete(userId);
 
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }
 
    return res.status(200).json({
      success: true,
      error: false,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to delete user",
    });
  }
};



// export const getAllUsersController = async (req, res) => {
//   try {
//     const users = await UserModel.find().select("-password").sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       error: false,
//       data: users,
//     });
//   } catch (error) {
//     console.error("Get users error:", error);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: error.message || "Failed to get users",
//     });
//   }
// };

// // UPDATE USER ROLE - ADMIN
// export const updateUserRoleController = async (req, res) => {
//   try {
//     const { userId} = req.params;
//     const { role } = req.body;

//     if (!["user", "admin"].includes(role)) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Role must be either 'user' or 'admin'",
//       });
//     }

//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "User not found",
//       });
//     }

//     if (req.userId?.toString() === user._id.toString()) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "You cannot change your own role",
//       });
//     }

//     user.role = role;
//     await user.save();

//     const safeUser = await UserModel.findById(userId).select("-password");

//     return res.status(200).json({
//       success: true,
//       error: false,
//       message: `User role changed to ${role} successfully`,
//       data: safeUser,
//     });
//   } catch (error) {
//     // console.error("Update user role error:", error);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: error.message || "Failed to update user role",
//     });

//   }
// };

// // DELETE USER - ADMIN
// export const deleteUserController = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (req.userId === userId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "You cannot delete your own account",
//       });
//     }

//     const user = await UserModel.findByIdAndDelete(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       error: false,
//       message: "User deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete user error:", error);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: error.message || "Failed to delete user",
//     });
//   }
// };