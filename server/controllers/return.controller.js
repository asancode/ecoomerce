import ReturnRequestModel from "../models/returnRequest.model.js";
import OrderModel from "../models/orderModel.js"; // ⚠️ apne existing Order model ka sahi path daalein
import {
  sendReturnRequestEmail,
  sendReturnStatusUpdateEmail,
} from "../utils/sendEmail.js";

// ============================================================
// CREATE RETURN / EXCHANGE REQUEST (user)
// POST /api/return/create
// ============================================================
// export const createReturnRequest = async (req, res) => {
//   try {
//     const userId = req.userId; // ⚠️ apne auth middleware ke variable name se match karein
//     const {
//       orderId,
//       productId,
//       productTitle,
//       image,
//       quantity,
//       price,
//       type,
//       reason,
//       description,
//       images,
//     } = req.body;

//     if (!orderId || !productTitle || !type || !reason) {
//       return res.status(400).json({
//         success: false,
//         message: "orderId, productTitle, type and reason are required.",
//       });
//     }

//     if (!["return", "exchange"].includes(type)) {
//       return res.status(400).json({
//         success: false,
//         message: "type must be either 'return' or 'exchange'.",
//       });
//     }

//     const order = await OrderModel.findById(orderId);
//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found." });
//     }

//     const status =
//       order?.order_status || order?.orderStatus || order?.status || "";

//     if (String(status).toLowerCase() !== "delivered") {
//       return res.status(400).json({
//         success: false,
//         message: "Return/Exchange can only be requested after delivery.",
//       });
//     }

//     const existing = await ReturnRequestModel.findOne({
//       order: orderId,
//       "product.productTitle": productTitle,
//       status: { $in: ["pending", "approved"] },
//     });

//     if (existing) {
//       return res.status(400).json({
//         success: false,
//         message: "A request for this product is already in progress.",
//       });
//     }

//     const returnRequest = await ReturnRequestModel.create({
//       order: orderId,
//       user: userId,
//       product: { productId, productTitle, image, quantity, price },
//       type,
//       reason,
//       description,
//       images: images || [],
//     });

//     // Email — fire and forget, request fail nahi hona chahiye email ki wajah se
//     sendReturnRequestEmail(
//       returnRequest,
//       req.userEmail || order?.delivery_address?.email
//     ).catch((e) => console.error("Return email failed:", e.message));

//     return res.status(201).json({
//       success: true,
//       message: `${
//         type === "return" ? "Return" : "Exchange"
//       } request submitted successfully.`,
//       data: returnRequest,
//     });
//   } catch (error) {
//     console.error("createReturnRequest Error:", error);
//     return res.status(500).json({ success: false, message: "Server error." });
//   }
// };
export const createReturnRequest = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      orderId,
      productId,
      productTitle,
      image,
      quantity,
      price,
      type,
      reason,
      description,
    } = req.body;

    if (!orderId || !productTitle || !type || !reason) {
      return res.status(400).json({
        success: false,
        message: "orderId, productTitle, type and reason are required.",
      });
    }

    if (!["return", "exchange"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "type must be either 'return' or 'exchange'.",
      });
    }

    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    const status = order?.order_status || order?.orderStatus || order?.status || "";

    if (String(status).toLowerCase() !== "delivered") {
      return res.status(400).json({
        success: false,
        message: "Return/Exchange can only be requested after delivery.",
      });
    }

    const existing = await ReturnRequestModel.findOne({
      order: orderId,
      "product.productTitle": productTitle,
      status: { $in: ["pending", "approved"] },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A request for this product is already in progress.",
      });
    }

    // ✅ Uploaded image ka public URL banao
    const uploadedImages = [];
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/returns/${req.file.filename}`;
      uploadedImages.push(imageUrl);
    }

    const returnRequest = await ReturnRequestModel.create({
      order: orderId,
      user: userId,
      product: { productId, productTitle, image, quantity, price },
      type,
      reason,
      description,
      images: uploadedImages, // ✅ ab yaha real uploaded image URL jayega
    });

    sendReturnRequestEmail(
      returnRequest,
      req.userEmail || order?.delivery_address?.email
    ).catch((e) => console.error("Return email failed:", e.message));

    return res.status(201).json({
      success: true,
      message: `${type === "return" ? "Return" : "Exchange"} request submitted successfully.`,
      data: returnRequest,
    });
  } catch (error) {
    console.error("createReturnRequest Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ============================================================
// GET LOGGED-IN USER'S REQUESTS
// GET /api/return/list
// ============================================================
export const getUserReturnRequests = async (req, res) => {
  try {
    const userId = req.userId;
    const requests = await ReturnRequestModel.find({ user: userId }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.error("getUserReturnRequests Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ============================================================
// GET SINGLE REQUEST
// GET /api/return/:id
// ============================================================
export const getReturnRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await ReturnRequestModel.findById(id);
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found." });
    }
    return res.status(200).json({ success: true, data: request });
  } catch (error) {
    console.error("getReturnRequestById Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ============================================================
// CANCEL REQUEST (user, only while pending)
// PUT /api/return/:id/cancel
// ============================================================
export const cancelReturnRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const request = await ReturnRequestModel.findOne({
      _id: id,
      user: userId,
    });

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found." });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending requests can be cancelled.",
      });
    }

    request.status = "cancelled";
    await request.save();

    return res
      .status(200)
      .json({ success: true, message: "Request cancelled.", data: request });
  } catch (error) {
    console.error("cancelReturnRequest Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ============================================================
// ADMIN: UPDATE REQUEST STATUS
// PUT /api/return/admin/:id/status
// ============================================================
export const updateReturnRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;

    const allowed = [
      "pending",
      "approved",
      "rejected",
      "completed",
      "cancelled",
    ];

    if (!allowed.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status." });
    }

    const request = await ReturnRequestModel.findByIdAndUpdate(
      id,
      { status, adminNote },
      { new: true }
    ).populate("user", "email name");

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found." });
    }

    sendReturnStatusUpdateEmail(request, request?.user?.email).catch((e) =>
      console.error("Status email failed:", e.message)
    );

    return res
      .status(200)
      .json({ success: true, message: "Status updated.", data: request });
  } catch (error) {
    console.error("updateReturnRequestStatus Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ============================================================
// ADMIN: GET ALL REQUESTS
// GET /api/return/admin/all
// ============================================================
export const getAllReturnRequests = async (req, res) => {
  try {
    const requests = await ReturnRequestModel.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.error("getAllReturnRequests Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
