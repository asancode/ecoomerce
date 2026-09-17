import express from "express";

// import {
//   aiSupportChat,
// } from "../controller/aiController.js";

import { aiSupportChat } from "../controllers/aiController.js";
// IMPORTANT:
// Apne project ka existing authentication middleware
// yahan import karein.
//
// Example:
//
import auth from "../middlewares/auth.js";

const aiRouter = express.Router();


// =====================================================
// AI SUPPORT
// =====================================================

// router.post(
//   "/chat",
//   authMiddleware,
//   aiSupportChat
// );

aiRouter.post(
  "/chat",auth,
  aiSupportChat
);


export default aiRouter;