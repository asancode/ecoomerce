// // import { Router } from "express";
// // import {
// //   loginController,
// //   logoutController,
// //   registerUserController,
// //   userAvatarController,
// //   verifyEmailController,
// //   removeAvatarController,
// //   updateUserDetailsController,
// //   forgotPasswordController,
// //   verifyForgotPasswordOTP,
// //   resetPasswordController,
// //   refreshTokenController,
// //   userDetails,
// //   authWithGoogle,addReviewController,getReviewsController,
// //   getReviewsIdController,
// //   getAllUsersController,
// //   updateUserRoleController,
// //   deleteUserController
// // } from "../controllers/userController.js";
// // import auth from "../middlewares/auth.js";
// // import upload from "../middlewares/multer.js";
// // import adminMiddleware from "../middlewares/auth.js";

// // const userRouter = Router();
// // userRouter.post("/register", registerUserController);
// // userRouter.post("/verify-email", verifyEmailController);
// // userRouter.post("/login", loginController);
// // userRouter.post("/authWithGoogle", authWithGoogle);
// // userRouter.get("/logout",auth, logoutController);
// // userRouter.put('/user-avatar',auth,upload.array('avatar'),userAvatarController)
// // userRouter.delete('/delete-user',auth,removeAvatarController)
// // userRouter.put('/:id',auth,updateUserDetailsController)
// // userRouter.post('/forgot-password',forgotPasswordController)
// // userRouter.post('/verify-forgot-password-otp',verifyForgotPasswordOTP)
// // userRouter.post('/reset-password',resetPasswordController)
// // userRouter.post('/refresh-token',refreshTokenController)
// // userRouter.get('/user-details',auth,userDetails)
// // userRouter.post('/add-review',auth,upload.array('avatar'),addReviewController)
// // userRouter.get('/get-reviews',getReviewsIdController)
// // userRouter.get('/get-reviews/:slug',getReviewsController)
// // userRouter.get(
// //   "/list",
// //   auth,
// //   adminMiddleware,
// //   getAllUsersController
// // );

// // // CHANGE ROLE
// // userRouter.put(
// //   "/:userId/role",
// //   auth,
// //   adminMiddleware,
// //   updateUserRoleController
// // );

// // // DELETE USER
// // userRouter.delete(
// //   "/:userId",
// //   auth,
// //   adminMiddleware,
// //   deleteUserController
// // );

// // export default userRouter;
// import { Router } from "express";
// import {
//   loginController,
//   logoutController,
//   registerUserController,
//   userAvatarController,
//   verifyEmailController,
//   removeAvatarController,
//   updateUserDetailsController,
//   forgotPasswordController,
//   verifyForgotPasswordOTP,
//   resetPasswordController,
//   refreshTokenController,
//   userDetails,
//   authWithGoogle,
//   addReviewController,
//   getReviewsController,
//   getReviewsIdController,
//   // getAllUsersController,
//   // updateUserRoleController,
//   // deleteUserController,
// } from "../controllers/userController.js";
// import auth, { adminMiddleware } from "../middlewares/auth.js"; // ✅ FIX: named import, not default
// import upload from "../middlewares/multer.js";

// const userRouter = Router();

// userRouter.post("/register", registerUserController);
// userRouter.post("/verify-email", verifyEmailController);
// userRouter.post("/login", loginController);
// userRouter.post("/authWithGoogle", authWithGoogle);
// userRouter.get("/logout", auth, logoutController);
// userRouter.put("/user-avatar", auth, upload.array("avatar"), userAvatarController);
// userRouter.delete("/delete-user", auth, removeAvatarController);
// userRouter.put("/:id", auth, updateUserDetailsController);
// userRouter.post("/forgot-password", forgotPasswordController);
// userRouter.post("/verify-forgot-password-otp", verifyForgotPasswordOTP);
// userRouter.post("/reset-password", resetPasswordController);
// userRouter.post("/refresh-token", refreshTokenController);
// userRouter.get("/user-details", auth, userDetails);
// userRouter.post("/add-review", auth, upload.array("avatar"), addReviewController);
// userRouter.get("/get-reviews", getReviewsIdController);
// userRouter.get("/get-reviews/:slug", getReviewsController);

// // userRouter.get("/list", auth, adminMiddleware, getAllUsersController);

// // // CHANGE ROLE
// // userRouter.put("/:userId/role", auth, adminMiddleware, updateUserRoleController);

// // // DELETE USER
// // userRouter.delete("/:userId", auth, adminMiddleware, deleteUserController);

// export default userRouter;
import { Router } from "express";
import {
  loginController,
  logoutController,
  registerUserController,
  userAvatarController,
  verifyEmailController,
  removeAvatarController,
  updateUserDetailsController,
  forgotPasswordController,
  verifyForgotPasswordOTP,
  resetPasswordController,
  refreshTokenController,
  userDetails,
  authWithGoogle,
  addReviewController,
  getReviewsController,
  getReviewsIdController,
  getAllUsersController,
  updateUserRoleController,
  deleteUserController,
} from "../controllers/userController.js";
import auth, { adminMiddleware } from "../middlewares/auth.js"; // ✅ FIX: named import, not default
import upload from "../middlewares/multer.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginController);
userRouter.post("/authWithGoogle", authWithGoogle);
userRouter.get("/logout", auth, logoutController);
userRouter.put(
  "/user-avatar",
  auth,
  upload.array("avatar"),
  userAvatarController,
);
userRouter.delete("/delete-user", auth, removeAvatarController);
userRouter.put("/:id", auth, updateUserDetailsController);
userRouter.post("/forgot-password", forgotPasswordController);
userRouter.post("/verify-forgot-password-otp", verifyForgotPasswordOTP);
userRouter.post("/reset-password", resetPasswordController);
userRouter.post("/refresh-token", refreshTokenController);
userRouter.get("/user-details", auth, userDetails);
userRouter.post(
  "/add-review",
  auth,
  upload.array("avatar"),
  addReviewController,
);
userRouter.get("/get-reviews", getReviewsIdController);
// userRouter.get("/get-reviews/:slug", getReviewsController);
userRouter.get("/get-reviews/:slug", getReviewsController);

// userRouter.get("/list", auth, adminMiddleware, getAllUsersController);

// // CHANGE ROLE
// userRouter.put("/:id/role", auth, adminMiddleware, updateUserRoleController);

// // DELETE USER
// userRouter.delete("/:userId", auth, adminMiddleware, deleteUserController);
userRouter.get("/list", auth, adminMiddleware, getAllUsersController);

// CHANGE ROLE (user <-> admin, both directions)
userRouter.put("/:id/role", auth, adminMiddleware, updateUserRoleController);

// DELETE USER
userRouter.delete("/:userId", auth, adminMiddleware, deleteUserController);

export default userRouter;
