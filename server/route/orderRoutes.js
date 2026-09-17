// import { Router } from "express";
// import auth from "../middlewares/auth.js";
// import { createOrderController, getOrderDetailsController, stripePaymentController } from "../controllers/orderController.js";

// const orderRouter = Router();
// orderRouter.post('/create',auth,createOrderController)
// orderRouter.get('/order-list',auth,getOrderDetailsController)
// orderRouter.post('/create-payment',auth,stripePaymentController)
// export default orderRouter
import { Router } from "express";
import auth from "../middlewares/auth.js";// ⚠️ apne existing auth middleware ka path daalein
import {
  createOrderController,
  getOrderDetailsController,
  getOrderByIdController,
  updateOrderStatusController,
  getOrderLocation,
  updateRiderLocation,
  // updateOrderStatus,
  // getTrackingLocation,
  // updateTrackingLocation,
} from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.post("/create", auth, createOrderController);
orderRouter.get("/list", auth, getOrderDetailsController);
orderRouter.get("/:id", auth, getOrderByIdController);
// UPDATE ORDER
orderRouter.put("/:orderId", auth, updateOrderStatusController);
// orderRouter.put(
//   "/:orderId/location",
//   auth,
//   updateDeliveryLocationController
// );


// =====================================================
// CUSTOMER
// Get current rider location
// =====================================================
orderRouter.get("/:orderId/location", auth, getOrderLocation);
orderRouter.patch("/:orderId/rider-location", auth, updateRiderLocation);
// orderRouter.get(
//   "/:orderId/location",
//   auth,
//   getTrackingLocationController
// );

export default orderRouter;