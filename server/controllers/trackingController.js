import OrderModel from "../models/orderModel.js";

// ============================================================
// UPDATE RIDER LOCATION
// ============================================================

export const updateRiderLocation = async (req, res) => {
  try {
    const { orderId } = req.params;

    const {
      latitude,
      longitude,
    } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    if (
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const lat = Number(latitude);
    const lng = Number(longitude);

    if (
      Number.isNaN(lat) ||
      Number.isNaN(lng)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid latitude or longitude",
      });
    }

    if (lat < -90 || lat > 90) {
      return res.status(400).json({
        success: false,
        message: "Invalid latitude",
      });
    }

    if (lng < -180 || lng > 180) {
      return res.status(400).json({
        success: false,
        message: "Invalid longitude",
      });
    }

    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // =========================================
    // ONLY TRACK ACTIVE DELIVERY
    // =========================================

    if (
      order.order_status !== "Shipped" &&
      order.order_status !== "Out for Delivery"
    ) {
      return res.status(400).json({
        success: false,
        message: "Rider tracking is not active for this order",
      });
    }

    order.deliveryLocation = {
      latitude: lat,
      longitude: lng,
      updatedAt: new Date(),
    };

    const updatedOrder = await order.save();

    return res.status(200).json({
      success: true,
      message: "Rider location updated",
      data: {
        latitude: updatedOrder.deliveryLocation.latitude,
        longitude: updatedOrder.deliveryLocation.longitude,
        updatedAt: updatedOrder.deliveryLocation.updatedAt,
      },
    });

  } catch (error) {
    console.error("Update rider location error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update rider location",
      error: error.message,
    });
  }
};
// ============================================================
// GET CUSTOMER ORDER TRACKING
// ============================================================

export const getOrderTracking = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const order = await OrderModel.findOne({
      _id: orderId,
      userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const customerAddress =
      order.delivery_address || {};

    return res.status(200).json({
      success: true,

      data: {
        orderId: order._id,

        orderStatus:
          order.order_status,

        deliveryStatus:
          order.delivery_status,

        // =====================================
        // SHOP
        // =====================================

        shopLocation: {
          latitude:
            order.shopLocation?.latitude ?? null,

          longitude:
            order.shopLocation?.longitude ?? null,

          name:
            order.shopLocation?.name ||
            "Shop",

          address:
            order.shopLocation?.address ||
            "",
        },

        // =====================================
        // RIDER PICKUP
        // =====================================

        pickupLocation: {
          latitude:
            order.pickupLocation?.latitude ?? null,

          longitude:
            order.pickupLocation?.longitude ?? null,

          updatedAt:
            order.pickupLocation?.updatedAt ?? null,
        },

        // =====================================
        // RIDER CURRENT LOCATION
        // =====================================

        riderLocation: {
          latitude:
            order.deliveryLocation?.latitude ?? null,

          longitude:
            order.deliveryLocation?.longitude ?? null,

          updatedAt:
            order.deliveryLocation?.updatedAt ?? null,
        },

        // =====================================
        // CUSTOMER
        // =====================================

        customerLocation: {
          latitude:
            customerAddress?.latitude ?? null,

          longitude:
            customerAddress?.longitude ?? null,

          address:
            customerAddress?.address_line1 ||
            customerAddress?.address ||
            "",
        },

        // =====================================
        // RIDER
        // =====================================

        deliveryAgent: order.deliveryAgent || null,
      },
    });

  } catch (error) {
    console.error(
      "Get order tracking error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to get tracking information",
      error: error.message,
    });
  }
};