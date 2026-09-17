import express from "express";

import {
  updateRiderLocation,
  getOrderTracking,
} from "../controllers/trackingController.js";

import authentication from "../middleware/authentication.js";

const TrackingRouter = express.Router();

// Customer gets complete tracking
TrackingRouter.get(
  "/:orderId/tracking",
  authentication,
  getOrderTracking
);

// Rider updates current GPS
TrackingRouter.put(
  "/:orderId/rider-location",
  authentication,
  updateRiderLocation
);

export default TrackingRouter;