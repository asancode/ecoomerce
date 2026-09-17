import React, { useCallback, useEffect, useState, useContext } from "react";
import AccountSidebar from "../Components/AccountSidebar";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import OrderTrackingMap from "../Components/OrderTrackingMap";
import L from "leaflet";

import {
  BsCheckCircleFill,
  BsBoxSeam,
  BsTruck,
  BsGeoAltFill,
  BsClockHistory,
  BsChevronDown,
  BsReceipt,
  BsXCircleFill,
  BsShop,
  BsArrowLeftRight,
} from "react-icons/bs";
import { CircularProgress } from "@mui/material";

import "leaflet/dist/leaflet.css";
import { MyContext } from "../App";
import PageTitle from "../Components/PageTitle";

// ======================================================
// LEAFLET MARKER FIX
// ======================================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ======================================================
// ORDER STEPS
// ======================================================

const orderSteps = [
  {
    key: "order_placed",
    title: "Order Placed",
    description: "Your order has been placed successfully.",
    icon: <BsCheckCircleFill />,
  },
  {
    key: "confirmed",
    title: "Confirmed",
    description: "Your order has been confirmed.",
    icon: <BsCheckCircleFill />,
  },
  {
    key: "preparing",
    title: "Preparing",
    description: "Your order is being prepared.",
    icon: <BsBoxSeam />,
  },
  {
    key: "shipped",
    title: "Out for Delivery",
    description: "Your delivery agent is on the way.",
    icon: <BsTruck />,
  },
  {
    key: "delivered",
    title: "Delivered",
    description: "Your order has been delivered.",
    icon: <BsCheckCircleFill />,
  },
];

// ======================================================
// RETURN / EXCHANGE REASONS
// ======================================================

const RETURN_REASONS = [
  "Wrong item received",
  "Item damaged / defective",
  "Size / fit issue",
  "Item not as described",
  "Changed my mind",
  "Other",
];

// ======================================================
// NORMALIZE ORDER STATUS
// ======================================================

const normalizeStatus = (status) => {
  if (!status) return "order_placed";

  const value = String(status)
    .trim()
    .toLowerCase()
    .replace(/-/g, "_")
    .replace(/\s+/g, "_");

  const statusMap = {
    pending: "order_placed",
    ordered: "order_placed",
    order_placed: "order_placed",
    confirmed: "confirmed",
    preparing: "preparing",
    packing: "preparing",
    processing: "preparing",
    shipped: "shipped",
    out_for_delivery: "shipped",
    outfordelivery: "shipped",
    out_for_delivered: "shipped",
    delivered: "delivered",
    cancelled: "cancelled",
  };

  return statusMap[value] || "order_placed";
};

// ============================================================
// LOCATION NORMALIZER
// ============================================================

const normalizeLocation = (location) => {
  if (!location) return null;

  const lat = Number(
    location?.latitude ??
      location?.lat ??
      location?.location?.latitude ??
      location?.location?.lat,
  );

  const lng = Number(
    location?.longitude ??
      location?.lng ??
      location?.lon ??
      location?.location?.longitude ??
      location?.location?.lng,
  );

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return {
    latitude: lat,
    longitude: lng,
    lat,
    lng,
    address: location?.address || "",
    updatedAt: location?.updatedAt || location?.timestamp || null,
  };
};

// ======================================================
// STATUS INDEX
// ======================================================

const getStatusIndex = (status) => {
  const normalizedStatus = normalizeStatus(status);
  const index = orderSteps.findIndex((step) => step.key === normalizedStatus);
  return index === -1 ? 0 : index;
};

// ======================================================
// STATUS BADGE
// ======================================================

const STATUS_BADGE_STYLE = {
  order_placed: "bg-slate-100 text-slate-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-amber-100 text-amber-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

// ======================================================
// VARIATION EXTRA PRICE
// ======================================================

const getVariationExtra = (variation) => {
  if (!variation || typeof variation !== "object") return 0;

  return Object.values(variation)
    .flat()
    .reduce((total, option) => total + (Number(option?.price) || 0), 0);
};

// ======================================================
// ORDERS COMPONENT
// ======================================================

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const context = useContext(MyContext);
  const [trackingData, setTrackingData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  // ✅ RETURN / EXCHANGE STATE
  const [returnModal, setReturnModal] = useState({
    open: false,
    order: null,
    product: null,
  });
  const [returnForm, setReturnForm] = useState({
    type: "return",
    reason: "",
    description: "",
    image: null,
  });
  const [returnSubmitting, setReturnSubmitting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL 

  const selectedOrder =
    orders.find((order) => order?._id === selectedOrderId) || null;

  // ======================================================
  // GET ORDERS
  // ======================================================

  const getOrders = useCallback(
    async (silent = false) => {
      try {
        if (!silent) setLoading(true);
        setError("");

        const token = localStorage.getItem("accessToken");

        const response = await axios.get(`${API_URL}/api/order/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const orderData =
          response?.data?.data ||
          response?.data?.orders ||
          response?.data ||
          [];

        setOrders(Array.isArray(orderData) ? orderData : []);
      } catch (err) {
        console.error("Get Orders Error:", err);
        if (!silent) {
          setError(
            err?.response?.data?.message || "Unable to load your orders.",
          );
        }
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [API_URL],
  );

  // ======================================================
  // GET LIVE ORDER TRACKING (sirf jab user tracking panel khole)
  // ======================================================

  const getOrderTracking = useCallback(
    async (orderId) => {
      if (!orderId) return;

      try {
        setLocationLoading(true);

        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          `${API_URL}/api/order/${orderId}/location`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const tracking = response?.data?.data || null;
        setTrackingData(tracking);
      } catch (err) {
        console.error("Get Order Tracking Error:", err);
        setTrackingData(null);
      } finally {
        setLocationLoading(false);
      }
    },
    [API_URL],
  );

  // ============================================================
  // GET ORDER LOCATIONS
  // ============================================================

  const getOrderLocations = useCallback((order, tracking) => {
    if (!order) {
      return { shop: null, customer: null };
    }

    const shop =
      normalizeLocation(tracking?.shopLocation) ||
      normalizeLocation(order?.shopLocation) ||
      normalizeLocation(order?.shop?.location) ||
      normalizeLocation(order?.shop?.coordinates);

    const customer =
      normalizeLocation(order?.customerLocation) ||
      normalizeLocation(order?.deliveryLocation) ||
      normalizeLocation(order?.shippingAddress?.location) ||
      normalizeLocation(order?.delivery_address?.location) ||
      normalizeLocation(order?.address?.location) ||
      normalizeLocation({
        latitude: order?.delivery_address?.latitude ?? order?.address?.latitude,
        longitude:
          order?.delivery_address?.longitude ?? order?.address?.longitude,
        address:
          order?.delivery_address?.address_line1 ||
          order?.delivery_address?.address ||
          order?.address?.address_line1 ||
          order?.address?.address,
      });

    return { shop, customer };
  }, []);

  // ======================================================
  // INITIAL ORDERS — sirf ek baar page load hone par fetch hoga.
  // ✅ Koi setInterval / auto-refresh timing nahi hai ab.
  // ======================================================

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  // ======================================================
  // ORDER TRACKING — sirf jab user "Track Your Order" khole,
  // tab ek baar fetch hoga. Koi repeating interval nahi.
  // ======================================================

  useEffect(() => {
    if (!selectedOrder?._id) {
      setTrackingData(null);
      return;
    }

    const rawStatus =
      selectedOrder?.order_status ||
      selectedOrder?.orderStatus ||
      selectedOrder?.status ||
      selectedOrder?.delivery_status ||
      "";

    const status = normalizeStatus(rawStatus);

    if (status === "cancelled") {
      setTrackingData(null);
      return;
    }

    getOrderTracking(selectedOrder._id);
  }, [
    selectedOrder?._id,
    selectedOrder?.order_status,
    selectedOrder?.orderStatus,
    selectedOrder?.status,
    selectedOrder?.delivery_status,
    getOrderTracking,
  ]);

  // ======================================================
  // ✅ RETURN / EXCHANGE HANDLERS
  // ======================================================

  const openReturnModal = (order, product) => {
    setReturnForm({ type: "return", reason: "", description: "", image: null });
    setImagePreview(null);
    setReturnModal({ open: true, order, product });
  };

  const closeReturnModal = () => {
    if (returnSubmitting) return;
    setReturnModal({ open: false, order: null, product: null });
    setImagePreview(null);
  };

  const MAX_IMAGE_SIZE_MB = 5;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      alert(`Image size should be less than ${MAX_IMAGE_SIZE_MB}MB.`);
      return;
    }

    setReturnForm((f) => ({ ...f, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setReturnForm((f) => ({ ...f, image: null }));
    setImagePreview(null);
  };

  // Cleanup on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const submitReturnRequest = async () => {
    if (!returnForm.reason) {
      context.openAlertBox("Please select a reason.");
      return;
    }

    try {
      setReturnSubmitting(true);

      const token = localStorage.getItem("accessToken");
      const { order, product } = returnModal;

      // ✅ FormData zaroori hai kyunki image file bhi ja rahi hai
      const formData = new FormData();
      formData.append("orderId", order?._id || "");
      formData.append("productId", product?._id || product?.productId || "");
      formData.append("productTitle", product?.productTitle || "");
      formData.append("quantity", product?.quantity ?? "");
      formData.append("price", product?.price ?? "");
      formData.append("type", returnForm.type);
      formData.append("reason", returnForm.reason);
      formData.append("description", returnForm.description || "");

      // Product ki purani image reference bhi bhejo
      if (product?.image || product?.images?.[0]) {
        formData.append(
          "productImage",
          product?.image || product?.images?.[0],
        );
      }

      // ✅ User ne upload ki hui naye image
      if (returnForm.image) {
        formData.append("image", returnForm.image);
      }

      await axios.post(`${API_URL}/api/return/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      context.openAlertBox(
        `${
          returnForm.type === "return" ? "Return" : "Exchange"
        } request submitted successfully.`,
      );

      setReturnModal({ open: false, order: null, product: null });
      removeImage();
    } catch (err) {
      console.error("submitReturnRequest Error:", err);
      context.openAlertBox(
        err?.response?.data?.message ||
          "Unable to submit request. Please try again.",
      );
    } finally {
      setReturnSubmitting(false);
    }
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <section className="section py-10 w-full bg-gray-100 min-h-screen">
        <div className="flex justify-center items-center py-20">
          <CircularProgress />
        </div>
      </section>
    );
  }

  // ======================================================
  // MAIN
  // ======================================================

  return (
      <><PageTitle  title="My Orders"
        description="Shop the latest products at the best prices. Discover quality products and fast delivery." />
    <section className="section py-6 sm:py-10 w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6 px-3 sm:px-4 lg:px-0">
        {/* SIDEBAR */}
        <div className="w-full lg:w-[20%]">
          <AccountSidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full lg:w-[80%]">
          {/* HEADER */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <BsReceipt className="text-lg" />
              </div>
              <div>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-slate-900">
                  My Orders
                </h2>
                <p className="text-slate-500 text-sm mt-0.5">
                  Track and manage your orders
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-sm text-slate-500">Total Orders</p>
              <p className="text-2xl font-bold text-slate-900">
                {orders.length}
              </p>
            </div>
          </div>

          {/* NO ORDERS */}
          {orders.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-16 text-center">
              <BsBoxSeam size={56} className="mx-auto text-slate-200" />
              <h3 className="text-xl font-semibold mt-5 text-slate-800">
                No Orders Found
              </h3>
              <p className="text-slate-500 mt-2">
                You have not placed any orders yet.
              </p>
            </div>
          )}

          {/* ORDERS */}
          {orders.length > 0 && (
            <div className="space-y-5">
              {orders.map((order) => {
                const rawStatus =
                  order?.order_status ||
                  order?.orderStatus ||
                  order?.status ||
                  order?.delivery_status ||
                  "Pending";

                const status = normalizeStatus(rawStatus);
                const isCancelled = status === "cancelled";
                const isDelivered = status === "delivered";
                const isSelected = selectedOrderId === order?._id;

                const products = Array.isArray(order?.products)
                  ? order.products
                  : [];

                const totalVariationExtra = products.reduce(
                  (sum, product) =>
                    sum +
                    getVariationExtra(product?.variation) *
                      Number(product?.quantity || 1),
                  0,
                );

                const subtotal = products.reduce((sum, product) => {
                  const variationExtra = getVariationExtra(product?.variation);
                  const unitPrice = Number(product?.price || 0);
                  const quantity = Number(product?.quantity || 1);
                  const lineTotal =
                    product?.subTotal != null
                      ? Number(product.subTotal)
                      : (unitPrice + variationExtra) * quantity;
                  return sum + lineTotal;
                }, 0);

                const addr = order?.delivery_address || order?.address || {};

                const customerCity = String(addr?.city || addr?.state || "")
                  .trim()
                  .toLowerCase();

                const isDubai = customerCity === "dubai";
                const shipping = isDubai ? 0 : 25;

                const isCod =
                  String(order?.payment_status || "").toUpperCase() ===
                  "CASH ON DELIVERY";
                const codCharge = isCod ? 49 : 0;

                const tax = (subtotal + shipping + codCharge) * 0.05;

                const grandTotal = Number(
                  order?.totalAmt ?? order?.totalAmount ?? 0,
                );

                const { shop, customer } = getOrderLocations(
                  order,
                  isSelected ? trackingData : null,
                );

                return (
                  <div
                    key={order?._id}
                    className={`bg-white rounded-2xl shadow-sm overflow-hidden border transition-all ${
                      isSelected ? "border-slate-900" : "border-slate-100"
                    }`}
                  >
                    {/* ORDER HEADER */}
                    <div className="px-4 sm:px-6 py-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <p className="font-semibold text-[15px] text-slate-800">
                          Order ID:{" "}
                          <span className="text-indigo-600">
                            {order?.orderId || order?._id?.slice(-8)}
                          </span>
                        </p>

                        {isCod ? (
                          <p className="text-[14px] text-slate-600">
                            Payment:{" "}
                            <span className="text-amber-600 font-medium">
                              Cash on Delivery
                            </span>
                          </p>
                        ) : (
                          <p className="text-[14px] text-slate-600">
                            Payment (Card):{" "}
                            <span
                              className={`font-medium ${
                                String(
                                  order?.payment_status || "",
                                ).toUpperCase() === "PAID"
                                  ? "text-emerald-600"
                                  : String(
                                        order?.payment_status || "",
                                      ).toUpperCase() === "FAILED"
                                    ? "text-red-500"
                                    : "text-slate-500"
                              }`}
                            >
                              {order?.payment_status || "Pending"}
                            </span>
                          </p>
                        )}

                        <p className="text-[14px] text-slate-600">
                          Order Date:{" "}
                          <span className="font-medium text-slate-700">
                            {order?.createdAt
                              ? new Date(order.createdAt).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col items-start lg:items-end gap-2">
                        <span
                          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium ${
                            STATUS_BADGE_STYLE[status] ||
                            STATUS_BADGE_STYLE.order_placed
                          }`}
                        >
                          {status === "delivered" ? (
                            <BsCheckCircleFill />
                          ) : status === "cancelled" ? (
                            <BsXCircleFill />
                          ) : (
                            <BsClockHistory />
                          )}

                          {status === "order_placed"
                            ? "Order Placed"
                            : status === "confirmed"
                              ? "Confirmed"
                              : status === "preparing"
                                ? "Preparing"
                                : status === "shipped"
                                  ? "Out for Delivery"
                                  : status === "delivered"
                                    ? "Delivered"
                                    : status === "cancelled"
                                      ? "Cancelled"
                                      : "Order Placed"}
                        </span>

                        <p className="text-[13px] text-slate-400">
                          Total:{" "}
                          <span className="text-slate-900 font-semibold text-[15px]">
                            AED {grandTotal.toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* PRODUCTS */}
                    <div className="px-4 sm:px-6 py-6 space-y-6">
                      {products.map((product, index) => {
                        const variationExtra = getVariationExtra(
                          product?.variation,
                        );
                        const unitPrice = Number(product?.price || 0);
                        const quantity = Number(product?.quantity || 1);
                        const lineTotal =
                          product?.subTotal != null
                            ? Number(product.subTotal)
                            : (unitPrice + variationExtra) * quantity;

                        return (
                          <div
                            key={product?._id || index}
                            className="flex flex-col sm:flex-row gap-5 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0"
                          >
                            <div className="w-full sm:w-[140px] shrink-0">
                              <img
                                src={
                                  product?.image ||
                                  product?.images?.[0] ||
                                  "/placeholder.png"
                                }
                                alt={product?.productTitle || "Product"}
                                className="w-full h-[180px] sm:h-[140px] object-cover rounded-xl border border-slate-100 bg-slate-50"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-[16px] text-slate-900">
                                {product?.productTitle || "N/A"}
                              </h3>

                              {product?.variation &&
                                Object.keys(product.variation).length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-2.5">
                                    {Object.entries(product.variation).map(
                                      ([attrName, options]) => {
                                        const optionList = Array.isArray(
                                          options,
                                        )
                                          ? options
                                          : [];

                                        return optionList
                                          .filter(Boolean)
                                          .map((option, optionIndex) => (
                                            <span
                                              key={`${attrName}-${optionIndex}`}
                                              className="text-[12.5px] bg-slate-50 text-slate-600 border border-slate-100 px-2.5 py-1 rounded-md"
                                            >
                                              <span className="font-medium capitalize">
                                                {attrName}:
                                              </span>{" "}
                                              {option?.name || option?.value}
                                              {Number(option?.price) > 0 && (
                                                <span className="text-indigo-600 ml-1">
                                                  (+AED{" "}
                                                  {Number(option.price).toFixed(
                                                    2,
                                                  )}
                                                  )
                                                </span>
                                              )}
                                            </span>
                                          ));
                                      },
                                    )}
                                  </div>
                                )}

                              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-[13px]">
                                <span className="text-slate-500">
                                  Qty:{" "}
                                  <span className="font-medium text-slate-800">
                                    {quantity}
                                  </span>
                                </span>

                                <span className="text-slate-500">
                                  Base:{" "}
                                  <span className="font-medium text-slate-800">
                                    AED {unitPrice.toFixed(2)}
                                  </span>
                                </span>

                                {variationExtra > 0 && (
                                  <span className="text-slate-500">
                                    Variation:{" "}
                                    <span className="font-medium text-amber-600">
                                      +AED {variationExtra.toFixed(2)}
                                    </span>
                                  </span>
                                )}

                                <span className="text-slate-500">
                                  Line Total:{" "}
                                  <span className="font-semibold text-indigo-600">
                                    AED {lineTotal.toFixed(2)}
                                  </span>
                                </span>
                              </div>

                              {/* ✅ RETURN / EXCHANGE BUTTON — sirf delivered orders par */}
                              {isDelivered && (
                                <button
                                  onClick={() =>
                                    openReturnModal(order, product)
                                  }
                                  className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-indigo-600 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition"
                                >
                                  <BsArrowLeftRight />
                                  Return / Exchange
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {/* TOTAL BREAKDOWN */}
                      <div className="bg-slate-50 rounded-xl p-4 space-y-1.5">
                        <div className="flex justify-between text-[13px] text-slate-500">
                          <span>Subtotal</span>
                          <span>AED {subtotal.toFixed(2)}</span>
                        </div>

                        {totalVariationExtra > 0 && (
                          <div className="flex justify-between text-[13px] text-slate-500">
                            <span>Variation charges</span>
                            <span>AED {totalVariationExtra.toFixed(2)}</span>
                          </div>
                        )}

                        <div className="flex justify-between text-[13px] text-slate-500">
                          <span>Shipping</span>
                          <span>
                            {shipping === 0
                              ? "Free"
                              : `AED ${shipping.toFixed(2)}`}
                          </span>
                        </div>

                        {isCod && (
                          <div className="flex justify-between text-[13px] text-slate-500">
                            <span>COD Charge</span>
                            <span>AED {codCharge.toFixed(2)}</span>
                          </div>
                        )}

                        <div className="flex justify-between text-[13px] text-slate-500">
                          <span>VAT (5%)</span>
                          <span>AED {tax.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-[15px] font-semibold text-slate-900 pt-1.5 border-t border-slate-200">
                          <span>Grand Total</span>
                          <span>AED {grandTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* TRACK BUTTON */}
                    <div className="px-4 sm:px-6 pb-6">
                      <button
                        onClick={() => {
                          const newSelectedId = isSelected ? null : order?._id;
                          setSelectedOrderId(newSelectedId);
                          setTrackingData(null);
                        }}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                      >
                        <BsTruck />
                        {isSelected
                          ? "Hide Order Tracking"
                          : "Track Your Order"}
                        <BsChevronDown
                          className={`transition-transform ${
                            isSelected ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* TRACKING PANEL */}
                    {isSelected && (
                      <div className="border-t border-slate-100 bg-slate-50 p-4 sm:p-6 space-y-5">
                        {isCancelled ? (
                          <div className="bg-white rounded-xl shadow-sm p-6 text-center text-red-500 font-medium">
                            <BsXCircleFill size={40} className="mx-auto mb-3" />
                            This order has been cancelled.
                          </div>
                        ) : (
                          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                            <h2 className="text-lg font-semibold mb-6 text-slate-900">
                              Order Process
                            </h2>

                            <div className="relative">
                              {orderSteps.map((step, index) => {
                                const currentIndex = getStatusIndex(status);
                                const completed = index <= currentIndex;
                                const active = index === currentIndex;

                                return (
                                  <div
                                    key={step.key}
                                    className="relative flex items-start pb-8 last:pb-0"
                                  >
                                    {index < orderSteps.length - 1 && (
                                      <div
                                        className={`absolute left-[17px] top-[35px] w-[2px] h-[65px] ${
                                          index < currentIndex
                                            ? "bg-slate-900"
                                            : "bg-slate-200"
                                        }`}
                                      />
                                    )}

                                    <div
                                      className={`relative z-10 w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 ${
                                        completed
                                          ? "bg-slate-900 text-white"
                                          : "bg-slate-100 text-slate-400"
                                      } ${
                                        active ? "ring-4 ring-slate-200" : ""
                                      }`}
                                    >
                                      {step.icon}
                                    </div>

                                    <div className="ml-5">
                                      <h3
                                        className={`font-semibold text-[15px] ${
                                          completed
                                            ? "text-slate-900"
                                            : "text-slate-400"
                                        }`}
                                      >
                                        {step.title}
                                      </h3>

                                      <p className="text-[13px] text-slate-500 mt-0.5">
                                        {step.description}
                                      </p>

                                      {active && (
                                        <span className="inline-block mt-2 text-[11px] bg-slate-900 text-white px-3 py-1 rounded-full">
                                          Current Status
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {!isCancelled && (
                          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                              <div>
                                <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-900">
                                  <BsGeoAltFill />
                                  Live Delivery Tracking
                                </h2>
                                <p className="text-[13px] text-slate-500 mt-1">
                                  Track the shop and delivery location.
                                </p>
                              </div>

                              {locationLoading && (
                                <div className="flex items-center gap-2 text-slate-500">
                                  <CircularProgress size={18} />
                                  <span className="text-[13px]">
                                    Updating location...
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-5">
                              <div className="border border-slate-200 rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                    <BsShop className="text-blue-600" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs text-slate-500">
                                      Shop
                                    </p>
                                    <p className="text-sm font-semibold truncate">
                                      {shop ? "Available" : "Not Available"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="border border-slate-200 rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                    <BsGeoAltFill className="text-green-600" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs text-slate-500">
                                      Customer
                                    </p>
                                    <p className="text-sm font-semibold truncate">
                                      {customer ? "Available" : "Not Available"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {shop || customer ? (
                              <OrderTrackingMap
                                shop={shop}
                                customer={customer}
                              />
                            ) : (
                              <div className="h-[260px] sm:h-[320px] bg-slate-50 rounded-xl flex flex-col justify-center items-center">
                                <BsGeoAltFill
                                  size={44}
                                  className="text-slate-300"
                                />
                                <h3 className="font-semibold text-[15px] mt-4 text-slate-700">
                                  Location Not Available
                                </h3>
                                <p className="text-slate-400 text-[13px] mt-1 text-center px-5">
                                  Shop and customer coordinates have not been
                                  received yet.
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* DELIVERY ADDRESS */}
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
                          <h3 className="font-semibold text-[15px] mb-3 text-slate-900">
                            Delivery Address
                          </h3>

                          <div className="bg-slate-50 rounded-lg p-4">
                            <p className="font-medium text-slate-800">
                              {addr?.name || order?.name || "Customer"}
                            </p>

                            <p className="text-slate-600 text-[13.5px] mt-1">
                              {[
                                addr?.address_line1 || addr?.address,
                                addr?.city,
                                addr?.state,
                                addr?.pincode,
                                addr?.country,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </p>

                            <p className="text-slate-600 text-[13.5px] mt-1">
                              Mobile: {addr?.mobile || order?.mobile || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ============================================================
          ✅ RETURN / EXCHANGE MODAL
      ============================================================ */}
      {returnModal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Return / Exchange
              </h3>
              <button
                onClick={closeReturnModal}
                className="text-slate-400 hover:text-slate-700 text-xl leading-none"
              >
                &times;
              </button>
            </div>

            <p className="text-sm text-slate-600 mb-4">
              Product:{" "}
              <span className="font-medium text-slate-900">
                {returnModal.product?.productTitle}
              </span>
            </p>

            {/* TYPE */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Request Type
              </label>
              <div className="flex gap-3">
                {["return", "exchange"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setReturnForm((f) => ({ ...f, type }))}
                    className={`flex-1 py-2 rounded-lg border text-sm font-medium capitalize transition ${
                      returnForm.type === type
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* REASON */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Reason
              </label>
              <select
                value={returnForm.reason}
                onChange={(e) =>
                  setReturnForm((f) => ({ ...f, reason: e.target.value }))
                }
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              >
                <option value="">Select a reason</option>
                {RETURN_REASONS.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Additional details (optional)
              </label>
              <textarea
                value={returnForm.description}
                onChange={(e) =>
                  setReturnForm((f) => ({
                    ...f,
                    description: e.target.value,
                  }))
                }
                rows={3}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                placeholder="Tell us more about the issue..."
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Upload Photo (optional)
              </label>

              {!imagePreview ? (
                <label
                  htmlFor="return-image-upload"
                  className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-lg py-6 cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition"
                >
                  <BsBoxSeam className="text-2xl text-slate-400" />
                  <span className="text-sm text-slate-500">
                    Click to upload an image
                  </span>
                  <span className="text-[11px] text-slate-400">
                    JPG / PNG, max 5MB
                  </span>
                  <input
                    id="return-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative w-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white text-slate-700 rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                    title="Remove image"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeReturnModal}
                disabled={returnSubmitting}
                className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-sm disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={submitReturnRequest}
                disabled={returnSubmitting}
                className="flex-1 py-2.5 rounded-lg bg-slate-900 text-white font-medium text-sm disabled:opacity-60"
              >
                {returnSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
    </>
  );
};

export default Orders;