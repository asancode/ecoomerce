import { Router } from "express";
import auth from "../middlewares/auth.js";
// import auth from "../middleware/auth.js"; // ⚠️ apne existing auth middleware ka path daalein
import {
  stripePaymentController,
  stripeWebhookController,
} from "../controllers/paymentController.js";

const paymentRouter = Router();

// Card payment ke liye PaymentIntent banata hai
paymentRouter.post("/create-payment-intent", auth, stripePaymentController);

// ⚠️ Webhook route ko app.js/index.js me express.json() se PEHLE,
// express.raw({ type: "application/json" }) ke saath mount karna hai.
// Isliye webhook route ko yahan se export karke alag se index.js me lagayein:
paymentRouter.post("/webhook", stripeWebhookController);

export default paymentRouter;
