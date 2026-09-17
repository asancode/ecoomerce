// import { Router } from "express";
// // import auth from "../middleware/auth.js"; // ⚠️ apna existing auth middleware import karein
// // import admin from "../middleware/admin.js"; // agar admin-check middleware hai to uncomment karein
// import auth from "../middlewares/auth.js";
// import {
//   createReturnRequest,
//   getUserReturnRequests,
//   getReturnRequestById,
//   cancelReturnRequest,
//   updateReturnRequestStatus,
//   getAllReturnRequests,
// } from "../controllers/return.controller.js";

// const returnRouter = Router();

// // -------------------- USER ROUTES --------------------
// returnRouter.post("/create", auth, createReturnRequest);
// returnRouter.get("/list", auth, getUserReturnRequests);
// returnRouter.get("/:id", auth, getReturnRequestById);
// returnRouter.put("/:id/cancel", auth, cancelReturnRequest);

// // -------------------- ADMIN ROUTES --------------------
// // Agar aapke paas admin middleware hai to route me "admin" bhi add kar dein:
// // returnRouter.get("/admin/all", auth, admin, getAllReturnRequests);
// returnRouter.get("/admin/all", auth, getAllReturnRequests);
// returnRouter.put("/admin/:id/status", auth, updateReturnRequestStatus);

// export default returnRouter;
import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/upload.js"; // ✅ naya

import {
  createReturnRequest,
  getUserReturnRequests,
  getReturnRequestById,
  cancelReturnRequest,
  updateReturnRequestStatus,
  getAllReturnRequests,
} from "../controllers/return.controller.js";

const returnRouter = Router();

// -------------------- USER ROUTES --------------------
returnRouter.post(
  "/create",
  auth,
  upload.single("image"), // ✅ multer yahan lagaya
  createReturnRequest
);
returnRouter.get("/list", auth, getUserReturnRequests);
returnRouter.get("/:id", auth, getReturnRequestById);
returnRouter.put("/:id/cancel", auth, cancelReturnRequest);

// -------------------- ADMIN ROUTES --------------------
returnRouter.get("/admin/all", auth, getAllReturnRequests);
returnRouter.put("/admin/:id/status", auth, updateReturnRequestStatus);

export default returnRouter;