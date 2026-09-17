// // // import OrderModel from "../models/orderModel.js"
// // // import ProductModel from "../models/productModel.js"
// // // import stripe from "stripe"
// // // // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // // export const createOrderController = async(req,res)=>{
// // //     try {
// // //         let order = new OrderModel({
// // //             userId:req.body.userId,
// // //             products:req.body.products,
// // //             paymentId:req.body.paymentId,
// // //             payment_status:req.body.payment_status,
// // //             delivery_address:req.body.delivery_address,
// // //             totalAmt:req.body.totalAmt,
// // //             invoice_receipt:req.body.invoice_receipt,
// // //             date:req.body.date
// // //         })
// // //         if (!order) {
// // //             res.status(500).json({
// // //                 error:true,
// // //                 success:false,

// // //             })
// // //         }
// // //         for(let i = 0; i<req.body.products.length; i++){
// // //             await ProductModel.findByIdAndUpdate(req.body.products[i].productId,
// // //                 {
// // //                     variation: parseInt(req.body.products[i].variation - req.body.products[i].quantity)
// // //                 },
// // //                 {new:true}
// // //             )
// // //         }
// // //         order = await order.save()
// // //         return res.status(200).json({
// // //             error:false,
// // //             success:true,
// // //             message:"Order Placed",
// // //             order:order
// // //         })
// // //     } catch (error) {

// // //     }
// // // }
// // // export const getOrderDetailsController = async(req,res)=>{
// // //     try {
// // //         const userId = req.userId
// // //         const ordeList = (await OrderModel.find({userId:userId})).toSorted({
// // //             createdAt:-1
// // //         }).populate('delivery_address,user')
// // //         return res.json({
// // //             message:"Order List",
// // //             data:orderList,
// // //             error:false,
// // //             success:true
// // //         })
// // //     } catch (error) {
// // //         return res.status(500).json({
// // //             message:error.message || error,
// // //             error:true,
// // //             success:false
// // //         })
// // //     }
// // // }
// // // export const stripePaymentController = async (req, res) => {
// // //   try {
// // //     const { totalAmt, products } = req.body;

// // //     if (!totalAmt || !products) {
// // //       return res.status(400).json({
// // //         error: true,
// // //         success: false,
// // //         message: "totalAmt and products required",
// // //       });
// // //     }

// // //     // ✅ Fix 8: session.create galat tha - paymentIntent use karo
// // //     const paymentIntent = await stripe.paymentIntents.create({
// // //       amount: parseInt(totalAmt * 100), // ✅ Cents mein
// // //       currency: "aed",
// // //       payment_method_types: ["card"],
// // //       metadata: {
// // //         products: JSON.stringify(
// // //           products.map((p) => ({
// // //             id: p.productId,
// // //             name: p.productTitle,
// // //             qty: p.quantity,
// // //           }))
// // //         ),
// // //       },
// // //     });

// // //     return res.status(200).json({
// // //       error: false,
// // //       success: true,
// // //       clientSecret: paymentIntent.client_secret, // ✅ Frontend ko chahiye
// // //       paymentIntentId: paymentIntent.id,
// // //     });

// // //   } catch (error) {
// // //     console.error("Stripe error:", error);
// // //     return res.status(500).json({
// // //       error: true,
// // //       success: false,
// // //       message: error.message || "Payment failed",
// // //     });
// // //   }
// // // };
// // // // export const stripePymentController = async(req,res)=>{
// // // //     const {products} = req.body
// // // //     const session = await stripe.checkout.session.create({
// // // //         payment_methods_type:["card"],
// // // //         line_items:"",
// // // //         mode:"payment",
// // // //         success_url:"http://http://localhost:5173/sucess",
// // // //         cancel_url:"http://http://localhost:5173/cancel",
// // // //     })
// // // // }
// // // import OrderModel from "../models/orderModel.js";
// // // import ProductModel from "../models/productModel.js";
// // // import Stripe from "stripe"; // ✅ Fix 1: import fix

// // // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // ✅ Fix 2: initialize karo

// // // // ✅ Create Order
// // // export const createOrderController = async (req, res) => {
// // //   try {
// // //     const {
// // //       userId,
// // //       products,
// // //       paymentId,
// // //       payment_status,
// // //       delivery_address,
// // //       totalAmt,
// // //       date,
// // //     } = req.body;

// // //     // ✅ Fix 3: Validation add karo
// // //     if (!userId || !products || !delivery_address || !totalAmt) {
// // //       return res.status(400).json({
// // //         error: true,
// // //         success: false,
// // //         message: "Required fields missing",
// // //       });
// // //     }

// // //     const order = new OrderModel({
// // //       userId,
// // //       products,
// // //       paymentId: paymentId || "",
// // //       payment_status: payment_status || "Pending",
// // //       delivery_address,
// // //       totalAmt,
// // //       date: date || new Date().toLocaleDateString("en-US", {
// // //         month: "short",
// // //         day: "2-digit",
// // //         year: "numeric",
// // //       }),
// // //     });

// // //     // ✅ Fix 4: Stock update logic galat tha - variation stock nahi hota
// // //     for (let i = 0; i < products.length; i++) {
// // //       await ProductModel.findByIdAndUpdate(
// // //         products[i].productId,
// // //         { $inc: { sales: products[i].quantity } }, // ✅ sales update karo
// // //         { new: true }
// // //       );
// // //     }

// // //     const savedOrder = await order.save(); // ✅ Fix 5: save ka result use karo

// // //     return res.status(201).json({
// // //       error: false,
// // //       success: true,
// // //       message: "Order placed successfully",
// // //       data: savedOrder,
// // //     });

// // //   } catch (error) {
// // //     console.error("Order error:", error);
// // //     return res.status(500).json({
// // //       error: true,
// // //       success: false,
// // //       message: error.message || "Internal server error",
// // //     });
// // //   }
// // // };

// // // // ✅ Get Order List
// // // export const getOrderDetailsController = async (req, res) => {
// // //   try {
// // //     const userId = req.userId;

// // //     // ✅ Fix 6: toSorted galat - sort() use karo, populate fix karo
// // //     const orderList = await OrderModel.find({ userId })
// // //       .sort({ createdAt: -1 }) // ✅ toSorted → sort()
// // //       .populate("delivery_address") // ✅ alag alag populate karo
// // //       .populate("userId");

// // //     // ✅ Fix 7: ordeList → orderList typo
// // //     return res.status(200).json({
// // //       error: false,
// // //       success: true,
// // //       message: "Order list",
// // //       data: orderList,
// // //     });

// // //   } catch (error) {
// // //     console.error("Order list error:", error);
// // //     return res.status(500).json({
// // //       error: true,
// // //       success: false,
// // //       message: error.message || "Internal server error",
// // //     });
// // //   }
// // // };

// // // // ✅ Stripe Payment Intent - Checkout ke liye
// // // // export const stripePaymentController = async (req, res) => {
// // // //   try {
// // // //     const { totalAmt, products } = req.body;

// // // //     if (!totalAmt || !products) {
// // // //       return res.status(400).json({
// // // //         error: true,
// // // //         success: false,
// // // //         message: "totalAmt and products required",
// // // //       });
// // // //     }

// // // //     // ✅ Fix 8: session.create galat tha - paymentIntent use karo
// // // //     const paymentIntent = await stripe.paymentIntents.create({
// // // //       amount: parseInt(totalAmt * 100), // ✅ Cents mein
// // // //       currency: "aed",
// // // //       payment_method_types: ["card"],
// // // //       metadata: {
// // // //         products: JSON.stringify(
// // // //           products.map((p) => ({
// // // //             id: p.productId,
// // // //             name: p.productTitle,
// // // //             qty: p.quantity,
// // // //             price: p. price,
// // // //             image: p. image,
// // // //             subTotal: p. subTotal,
// // // //             slug: p. slug,
// // // //             catName: p. catName,
// // // //             variation: p. variation,
// // // //           }))
// // // //         ),
// // // //       },
// // // //     });

// // // //     return res.status(200).json({
// // // //       error: false,
// // // //       success: true,
// // // //       clientSecret: paymentIntent.client_secret, // ✅ Frontend ko chahiye
// // // //       paymentIntentId: paymentIntent.id,
// // // //     });

// // // //   } catch (error) {
// // // //     console.error("Stripe error:", error);
// // // //     return res.status(500).json({
// // // //       error: true,
// // // //       success: false,
// // // //       message: error.message || "Payment failed",
// // // //     });
// // // //   }
// // // // };
// // // // export const stripePaymentController = async (req, res) => {
// // // //   try {
// // // //     const { totalAmt, products } = req.body;

// // // //     console.log("Request Body:", req.body);
// // // //     console.log("totalAmt:", totalAmt);
// // // //     console.log("Type:", typeof totalAmt);

// // // //     const amount = Number(totalAmt);

// // // //     if (isNaN(amount) || amount <= 0) {
// // // //       return res.status(400).json({
// // // //         error: true,
// // // //         success: false,
// // // //         message: "Invalid total amount",
// // // //       });
// // // //     }

// // // //     if (!Array.isArray(products) || products.length === 0) {
// // // //       return res.status(400).json({
// // // //         error: true,
// // // //         success: false,
// // // //         message: "Products are required",
// // // //       });
// // // //     }

// // // //     const paymentIntent = await stripe.paymentIntents.create({
// // // //       amount: Math.round(amount * 100),
// // // //       currency: "aed",
// // // //       payment_method_types: ["card"],
// // // //       metadata: {
// // // //         products: JSON.stringify(
// // // //           products.map((p) => ({
// // // //             id: p.productId,
// // // //             name: p.productTitle,
// // // //             qty: p.quantity,
// // // //             price: p.price,
// // // //           }))
// // // //         ),
// // // //       },
// // // //     });

// // // //     return res.status(200).json({
// // // //       success: true,
// // // //       clientSecret: paymentIntent.client_secret,
// // // //       paymentIntentId: paymentIntent.id,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error(error);

// // // //     return res.status(500).json({
// // // //       success: false,
// // // //       message: error.message,
// // // //     });
// // // //   }
// // // // };

// // // export const stripePaymentController = async (req, res) => {
// // //   try {
// // //     const { totalAmt, products } = req.body;

// // //     console.log("========== STRIPE PAYMENT ==========");
// // //     console.log("Body:", req.body);
// // //     console.log("Total Amount:", totalAmt);
// // //     console.log("Amount Type:", typeof totalAmt);
// // //     console.log("====================================");

// // //     // Check products
// // //     if (!Array.isArray(products) || products.length === 0) {
// // //       return res.status(400).json({
// // //         error: true,
// // //         success: false,
// // //         message: "Products are required",
// // //       });
// // //     }

// // //     // Convert amount into number
// // //     const amount = Number(totalAmt);

// // //     if (!Number.isFinite(amount) || amount <= 0) {
// // //       return res.status(400).json({
// // //         error: true,
// // //         success: false,
// // //         message: `Invalid total amount: ${totalAmt}`,
// // //       });
// // //     }

// // //     // Stripe accepts smallest currency unit
// // //     const stripeAmount = Math.round(amount * 100);

// // //     console.log("Stripe Amount:", stripeAmount);

// // //     const paymentIntent = await stripe.paymentIntents.create({
// // //       amount: stripeAmount,
// // //       currency: "aed",
// // //       payment_method_types: ["card"],

// // //       metadata: {
// // //         products: JSON.stringify(
// // //           products.map((item) => ({
// // //             productId: item.productId,
// // //             title: item.productTitle,
// // //             quantity: item.quantity,
// // //             price: item.price,
// // //           }))
// // //         ),
// // //       },
// // //     });

// // //     return res.status(200).json({
// // //       error: false,
// // //       success: true,
// // //       message: "Payment intent created",
// // //       clientSecret: paymentIntent.client_secret,
// // //       paymentIntentId: paymentIntent.id,
// // //     });

// // //   } catch (error) {

// // //     console.log("Stripe Error:", error.message);

// // //     return res.status(500).json({
// // //       error: true,
// // //       success: false,
// // //       message: error.message,
// // //     });

// // //   }
// // // };

// // import OrderModel from "../models/orderModel.js";
// // import ProductModel from "../models/productModel.js";
// // import CartProductModel from "../models/cart.models.js"; // ⚠️ apne existing Cart model se replace karein
// // import { verifyStripePayment } from "./paymentController.js";
// // import { getNextOrderNumber } from "../utils/orderNumber.js";

// // // ✅ Create Order
// // // Body: { products, delivery_address, totalAmt, paymentMethod: "card" | "cod", paymentIntentId? }
// // export const createOrderController = async (req, res) => {
// //   try {
// //     const userId = req.userId; // auth middleware se aata hai
// //     const {
// //       products,
// //       paymentMethod, // "card" ya "cod"
// //       paymentIntentId, // sirf card ke liye
// //       delivery_address,
// //       totalAmt,
// //       date,
// //     } = req.body;

// //     // ✅ Validation
// //     if (!userId) {
// //       return res.status(401).json({
// //         error: true,
// //         success: false,
// //         message: "User authenticated nahi hai",
// //       });
// //     }
// //     if (!products?.length || !delivery_address || !totalAmt || !paymentMethod) {
// //       return res.status(400).json({
// //         error: true,
// //         success: false,
// //         message: "Required fields missing (products, delivery_address, totalAmt, paymentMethod)",
// //       });
// //     }

// //     let paymentId = "";
// //     let payment_status = "";
// //     let order_status = "Pending";

// //     if (paymentMethod === "card") {
// //       if (!paymentIntentId) {
// //         return res.status(400).json({
// //           error: true,
// //           success: false,
// //           message: "paymentIntentId zaroori hai card payment ke liye",
// //         });
// //       }

// //       // ✅ Stripe se khud verify karo — client ke "payment success" claim par
// //       // kabhi bharosa mat karo, warna koi bina paise diye order place kar sakta hai
// //       const verification = await verifyStripePayment(paymentIntentId, totalAmt);
// //       if (!verification.valid) {
// //         return res.status(402).json({
// //           error: true,
// //           success: false,
// //           message: verification.reason,
// //         });
// //       }

// //       paymentId = paymentIntentId;
// //       payment_status = "PAID";
// //       order_status = "Confirmed";
// //     } else if (paymentMethod === "cod") {
// //       paymentId = "";
// //       payment_status = "CASH ON DELIVERY";
// //       order_status = "Confirmed";
// //     } else {
// //       return res.status(400).json({
// //         error: true,
// //         success: false,
// //         message: "Invalid paymentMethod — 'card' ya 'cod' hona chahiye",
// //       });
// //     }

// //     const order = new OrderModel({
// //       userId,
// //       products,
// //       paymentId,
// //       payment_status,
// //       order_status,
// //       delivery_address,
// //       totalAmt,
// //       date:
// //         date ||
// //         new Date().toLocaleDateString("en-US", {
// //           month: "short",
// //           day: "2-digit",
// //           year: "numeric",
// //         }),
// //     });

// //     // ✅ Stock/sales update
// //     for (let i = 0; i < products.length; i++) {
// //       await ProductModel.findByIdAndUpdate(
// //         products[i].productId,
// //         { $inc: { sales: products[i].quantity } },
// //         { new: true }
// //       );
// //     }

// //     const savedOrder = await order.save();

// //     // ✅ Order successfully save hote hi user ka cart empty karo
// //     await CartProductModel.deleteMany({ userId });

// //     return res.status(201).json({
// //       error: false,
// //       success: true,
// //       message:
// //         paymentMethod === "cod"
// //           ? "Order placed successfully (Cash on Delivery)"
// //           : "Payment successful, order placed",
// //       data: savedOrder,
// //     });
// //   } catch (error) {
// //     console.error("Order error:", error);
// //     return res.status(500).json({
// //       error: true,
// //       success: false,
// //       message: error.message || "Internal server error",
// //     });
// //   }
// // };

// // // ✅ Get Order List
// // export const getOrderDetailsController = async (req, res) => {
// //   try {
// //     const userId = req.userId;

// //     const orderList = await OrderModel.find({ userId })
// //       .sort({ createdAt: -1 })
// //       .populate("delivery_address")
// //       .populate("userId");

// //     return res.status(200).json({
// //       error: false,
// //       success: true,
// //       message: "Order list",
// //       data: orderList,
// //     });
// //   } catch (error) {
// //     console.error("Order list error:", error);
// //     return res.status(500).json({
// //       error: true,
// //       success: false,
// //       message: error.message || "Internal server error",
// //     });
// //   }
// // };

// // // ✅ Single order detail (order confirmation page ke liye)
// // export const getOrderByIdController = async (req, res) => {
// //   try {
// //     const userId = req.userId;
// //     const { orderId } = req.params;

// //     const order = await OrderModel.findOne({ _id: orderId, userId }).populate(
// //       "delivery_address"
// //     );

// //     if (!order) {
// //       return res.status(404).json({
// //         error: true,
// //         success: false,
// //         message: "Order nahi mila",
// //       });
// //     }

// //     return res.status(200).json({
// //       error: false,
// //       success: true,
// //       data: order,
// //     });
// //   } catch (error) {
// //     return res.status(500).json({
// //       error: true,
// //       success: false,
// //       message: error.message || "Internal server error",
// //     });
// //   }
// // };

// import OrderModel from "../models/orderModel.js";
// import ProductModel from "../models/productModel.js";
// import CartProductModel from "../models/cart.models.js"; // ⚠️ apne existing Cart model se replace karein
// import { verifyStripePayment } from "./paymentController.js";
// import { getNextOrderNumber } from "../utils/orderNumber.js";

// // ✅ Create Order
// // Body: { products, delivery_address, totalAmt, paymentMethod: "card" | "cod", paymentIntentId? }
// export const createOrderController = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const {
//       orderId,
//       paymentMethod, // ✅ yeh line add karein
//       products,
//       paymentId,
//       payment_status,
//       order_status,
//       delivery_address,
//       totalAmt,
//       date,
//     } = req.body;

//     if (!userId) {
//       return res.status(401).json({
//         error: true,
//         success: false,
//         message: "User authenticated nahi hai",
//       });
//     }
//     if (!products?.length || !delivery_address || !totalAmt || !paymentMethod) {
//       return res.status(400).json({
//         error: true,
//         success: false,
//         message:
//           "Required fields missing (products, delivery_address, totalAmt, paymentMethod)",
//       });
//     }

//     // let paymentId = "";
//     // let payment_status = "";
//     // let order_status = "Pending";

//     if (paymentMethod === "card") {
//       if (!paymentIntentId) {
//         return res.status(400).json({
//           error: true,
//           success: false,
//           message: "paymentIntentId zaroori hai card payment ke liye",
//         });
//       }

//       const verification = await verifyStripePayment(paymentIntentId, totalAmt);
//       if (!verification.valid) {
//         return res.status(402).json({
//           error: true,
//           success: false,
//           message: verification.reason,
//         });
//       }

//       paymentId = paymentIntentId;
//       payment_status = "PAID";
//       order_status = "Confirmed";
//     } else if (paymentMethod === "cod") {
//       paymentId = "";
//       payment_status = "CASH ON DELIVERY";
//       order_status = "Confirmed";
//     } else {
//       return res.status(400).json({
//         error: true,
//         success: false,
//         message: "Invalid paymentMethod — 'card' ya 'cod' hona chahiye",
//       });
//     }

//     // ✅ Order save hone se PEHLE sequential orderId generate karo (#001, #002, ...)
//     // const orderId = await getNextOrderNumber();

//     const order = new OrderModel({
//       userId,
//       orderId,
//       paymentMethod, // ✅ yeh line add karein
//       products,
//       paymentId,
//       payment_status,
//       order_status,
//       delivery_address,
//       totalAmt,
//       date:
//         date ||
//         new Date().toLocaleDateString("en-US", {
//           month: "short",
//           day: "2-digit",
//           year: "numeric",
//         }),
//     });

//     for (let i = 0; i < products.length; i++) {
//       await ProductModel.findByIdAndUpdate(
//         products[i].productId,
//         { $inc: { sales: products[i].quantity } },
//         { new: true },
//       );
//     }

//     const savedOrder = await order.save();

//     // ✅ Order successfully save hote hi user ka cart empty karo
//     await CartProductModel.deleteMany({ userId });

//     return res.status(201).json({
//       error: false,
//       success: true,
//       message:
//         paymentMethod === "cod"
//           ? "Order placed successfully (Cash on Delivery)"
//           : "Payment successful, order placed",
//       data: savedOrder,
//     });
//   } catch (error) {
//     console.error("Order error:", error);
//     return res.status(500).json({
//       error: true,
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// // ✅ Get Order List
// export const getOrderDetailsController = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const orderList = await OrderModel.find({ userId })
//       .sort({ createdAt: -1 })
//       .populate("delivery_address")
//       .populate("userId");

//     return res.status(200).json({
//       error: false,
//       success: true,
//       message: "Order list",
//       data: orderList,
//     });
//   } catch (error) {
//     console.error("Order list error:", error);
//     return res.status(500).json({
//       error: true,
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// // ✅ Single order detail
// export const getOrderByIdController = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { orderId } = req.params;

//     const order = await OrderModel.findOne({ _id: orderId, userId }).populate(
//       "delivery_address",
//     );

//     if (!order) {
//       return res.status(404).json({
//         error: true,
//         success: false,
//         message: "Order nahi mila",
//       });
//     }

//     return res.status(200).json({
//       error: false,
//       success: true,
//       data: order,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: true,
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };
// import OrderModel from "../models/orderModel.js";
// import ProductModel from "../models/productModel.js";
// import CartProductModel from "../models/cart.models.js"; // ⚠️ apne existing Cart model se replace karein
// import { verifyStripePayment } from "./paymentController.js";
// import { getNextOrderNumber } from "../utils/orderNumber.js";

// const ORDER_STATUSES = ["Pending", "Confirmed", "Preparing", "Shipped", "Delivered", "Cancelled"];

// // ============================================================
// // CREATE ORDER
// // Body: { products, delivery_address, totalAmt, paymentMethod: "card" | "cod", paymentIntentId? }
// // ============================================================
// export const createOrderController = async (req, res) => {
//   try {
//     const userId = req.userId;

//     // ✅ Fix: SIRF yeh fields client se lo. paymentId/payment_status/
//     // order_status/orderId KABHI client se destructure mat karo — na
//     // security ke liye (client "PAID" bhej sakta hai), na yahan
//     // "const reassignment" crash ke liye (jo pehle ho raha tha)
//     const {
//       products,
//       paymentMethod,
//       paymentIntentId, // ✅ ab sahi se destructure ho raha hai (pehle missing tha)
//       delivery_address,
//       totalAmt,
//       date,
//     } = req.body;

//     if (!userId) {
//       return res.status(401).json({
//         error: true,
//         success: false,
//         message: "User authenticated nahi hai",
//       });
//     }

//     if (!products?.length || !delivery_address || !totalAmt || !paymentMethod) {
//       return res.status(400).json({
//         error: true,
//         success: false,
//         message: "Required fields missing (products, delivery_address, totalAmt, paymentMethod)",
//       });
//     }

//     // ✅ Fix: "let" use karo — ab inhe function ke andar reassign karna
//     // koi crash nahi karega (pehle "const" hone se crash hota tha)
//     let paymentId = "";
//     let payment_status = "";
//     let order_status = "Pending";

//     if (paymentMethod === "card") {
//       if (!paymentIntentId) {
//         return res.status(400).json({
//           error: true,
//           success: false,
//           message: "paymentIntentId zaroori hai card payment ke liye",
//         });
//       }

//       const verification = await verifyStripePayment(paymentIntentId, totalAmt);
//       if (!verification.valid) {
//         return res.status(402).json({
//           error: true,
//           success: false,
//           message: verification.reason,
//         });
//       }

//       paymentId = paymentIntentId;
//       payment_status = "PAID";
//       order_status = "Pending";
//     } else if (paymentMethod === "cod") {
//       paymentId = "";
//       payment_status = "CASH ON DELIVERY";
//       order_status = "Pending";
//     } else {
//       return res.status(400).json({
//         error: true,
//         success: false,
//         message: "Invalid paymentMethod — 'card' ya 'cod' hona chahiye",
//       });
//     }

//     // ✅ Fix: orderId hamesha server par generate hota hai, client se
//     // kabhi nahi (client-supplied orderId unique-index collision ka
//     // risk bhi rakhta tha)
//     const orderId = await getNextOrderNumber();

//     const order = new OrderModel({
//       userId,
//       orderId,
//       paymentMethod,
//       products,
//       paymentId,
//       payment_status,
//       order_status,
//       delivery_address,
//       totalAmt,
//       date:
//         date ||
//         new Date().toLocaleDateString("en-US", {
//           month: "short",
//           day: "2-digit",
//           year: "numeric",
//         }),
//     });

//     for (let i = 0; i < products.length; i++) {
//       await ProductModel.findByIdAndUpdate(
//         products[i].productId,
//         { $inc: { sales: products[i].quantity } },
//         { new: true }
//       );
//     }

//     const savedOrder = await order.save();

//     await CartProductModel.deleteMany({ userId });

//     return res.status(201).json({
//       error: false,
//       success: true,
//       message:
//         paymentMethod === "cod"
//           ? "Order placed successfully (Cash on Delivery)"
//           : "Payment successful, order placed",
//       data: savedOrder,
//     });
//   } catch (error) {
//     console.error("Order error:", error);
//     return res.status(500).json({
//       error: true,
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// // ============================================================
// // GET ORDER LIST
// // ============================================================
// export const getOrderDetailsController = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const orderList = await OrderModel.find({ userId })
//       .sort({ createdAt: -1 })
//       .populate("delivery_address")
//       .populate("userId");

//     return res.status(200).json({
//       error: false,
//       success: true,
//       message: "Order list",
//       data: orderList,
//     });
//   } catch (error) {
//     console.error("Order list error:", error);
//     return res.status(500).json({
//       error: true,
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// // ============================================================
// // GET SINGLE ORDER
// // ============================================================
// export const getOrderByIdController = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { orderId } = req.params;

//     const order = await OrderModel.findOne({ _id: orderId, userId }).populate(
//       "delivery_address"
//     );

//     if (!order) {
//       return res.status(404).json({
//         error: true,
//         success: false,
//         message: "Order nahi mila",
//       });
//     }

//     return res.status(200).json({
//       error: false,
//       success: true,
//       data: order,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: true,
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// // ============================================================
// // UPDATE ORDER STATUS (admin)
// // PATCH /api/order/status/:orderId
// // ============================================================
// export const updateOrderStatusController = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { order_status } = req.body;

//     if (!order_status || !ORDER_STATUSES.includes(order_status)) {
//       return res.status(400).json({
//         success: false,
//         message: `Invalid order_status. Allowed: ${ORDER_STATUSES.join(", ")}`,
//       });
//     }

//     const updatedOrder = await OrderModel.findByIdAndUpdate(
//       orderId,
//       { $set: { order_status } },
//       { new: true, runValidators: true }
//     ).populate("delivery_address");

//     if (!updatedOrder) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     return res.status(200).json({
//       error: false,
//       success: true,
//       message: "Order status updated successfully",
//       data: updatedOrder,
//     });
//   } catch (error) {
//     console.error("Update order status error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Failed to update order status",
//     });
//   }
// };
// export const updateRiderLocation = async (req, res) => {
//   const { orderId } = req.params;
//   const { latitude, longitude } = req.body;

//   if (latitude == null || longitude == null) {
//     return res.status(400).json({ success: false, message: "latitude/longitude required" });
//   }

//   await Order.findByIdAndUpdate(orderId, {
//     riderLocation: { latitude, longitude, updatedAt: new Date() },
//   });

//   return res.json({ success: true });
// };
// export const getOrderLocation = async (req, res) => {
//   const { orderId } = req.params;

//   const order = await OrderModel.findById(orderId).select(
//     "shopLocation pickupLocation riderLocation"
//   );

//   if (!order) {
//     return res.status(404).json({ success: false, message: "Order not found" });
//   }

//   return res.json({
//     success: true,
//     data: {
//       shopLocation: order.shopLocation || null,
//       pickupLocation: order.pickupLocation || null,
//       riderLocation: order.riderLocation || null,
//     },
//   });
// };
// // ============================================================
// // RIDER: UPDATE LIVE DELIVERY LOCATION
// // ============================================================
// export const updateDeliveryLocationController = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { latitude, longitude } = req.body;

//     if (latitude === undefined || longitude === undefined) {
//       return res.status(400).json({
//         success: false,
//         message: "latitude aur longitude zaroori hain",
//       });
//     }

//     const order = await OrderModel.findByIdAndUpdate(
//       orderId,
//       {
//         deliveryLocation: {
//           latitude: Number(latitude),
//           longitude: Number(longitude),
//           updatedAt: new Date(),
//         },
//       },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     return res.status(200).json({ success: true, message: "Location updated" });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// // ============================================================
// // CUSTOMER: GET RIDER'S LIVE LOCATION
// // GET /api/order/:orderId/tracking-location
// // ============================================================
// export const getTrackingLocationController = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await OrderModel.findById(orderId).select("deliveryLocation");

//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     const hasLocation =
//       order?.deliveryLocation?.latitude !== undefined &&
//       order?.deliveryLocation?.longitude !== undefined;

//     return res.status(200).json({
//       success: true,
//       available: hasLocation,
//       data: hasLocation
//         ? {
//             latitude: order.deliveryLocation.latitude,
//             longitude: order.deliveryLocation.longitude,
//             updatedAt: order.deliveryLocation.updatedAt,
//           }
//         : null,
//       message: hasLocation ? "Location found" : "Rider location is not available yet",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// import OrderModel from "../models/orderModel.js";
// import ProductModel from "../models/productModel.js";
// import CartProductModel from "../models/cart.models.js"; // ⚠️ apne existing Cart model se replace karein
// import { verifyStripePayment } from "./paymentController.js";
// import { getNextOrderNumber } from "../utils/orderNumber.js";

// const ORDER_STATUSES = ["Pending", "Confirmed", "Preparing", "Shipped", "Delivered", "Cancelled"];

// // ✅ FIX: Shop ki fixed location. Apni actual shop coordinates yahan daalo,
// // ya .env se lo (SHOP_LAT / SHOP_LNG / SHOP_ADDRESS). Isse pehle ye
// // createOrderController mein kahin set hi nahi ho raha tha, isliye
// // shopLocation hamesha {} (empty) save hota tha.
// const SHOP_LOCATION = {
//   latitude: Number(process.env.SHOP_LAT) || 25.1211725,
//   longitude: Number(process.env.SHOP_LNG) || 55.2423971,
//   address: process.env.SHOP_ADDRESS || "Before dewa office - Building number 12 Office number - 1M-03 26th St - opposite ag cars workshop - Al Qouz Ind.fourth - Al Quoz - Dubai",
// };

// // ============================================================
// // CREATE ORDER
// // Body: { products, delivery_address, totalAmt, paymentMethod: "card" | "cod", paymentIntentId? }
// // ============================================================
// export const createOrderController = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const {
//       products,
//       paymentMethod,
//       paymentIntentId,
//       delivery_address,
//       totalAmt,
//       date,
//     } = req.body;

//     if (!userId) {
//       return res.status(401).json({
//         error: true,
//         success: false,
//         message: "User authenticated nahi hai",
//       });
//     }

//     if (!products?.length || !delivery_address || !totalAmt || !paymentMethod) {
//       return res.status(400).json({
//         error: true,
//         success: false,
//         message: "Required fields missing (products, delivery_address, totalAmt, paymentMethod)",
//       });
//     }

//     let paymentId = "";
//     let payment_status = "";
//     let order_status = "Pending";

//     if (paymentMethod === "card") {
//       if (!paymentIntentId) {
//         return res.status(400).json({
//           error: true,
//           success: false,
//           message: "paymentIntentId zaroori hai card payment ke liye",
//         });
//       }

//       const verification = await verifyStripePayment(paymentIntentId, totalAmt);
//       if (!verification.valid) {
//         return res.status(402).json({
//           error: true,
//           success: false,
//           message: verification.reason,
//         });
//       }

//       paymentId = paymentIntentId;
//       payment_status = "PAID";
//       order_status = "Pending";
//     } else if (paymentMethod === "cod") {
//       paymentId = "";
//       payment_status = "CASH ON DELIVERY";
//       order_status = "Pending";
//     } else {
//       return res.status(400).json({
//         error: true,
//         success: false,
//         message: "Invalid paymentMethod — 'card' ya 'cod' hona chahiye",
//       });
//     }

//     const orderId = await getNextOrderNumber();

//     const order = new OrderModel({
//       userId,
//       orderId,
//       paymentMethod,
//       products,
//       paymentId,
//       payment_status,
//       order_status,
//       delivery_address,
//       totalAmt,
//       date:
//         date ||
//         new Date().toLocaleDateString("en-US", {
//           month: "short",
//           day: "2-digit",
//           year: "numeric",
//         }),
//       // ✅ FIX: ab har order create hote hi shop location bhi save hoti hai,
//       // isliye map par shop marker turant available rahega.
//       shopLocation: SHOP_LOCATION,
//     });
    

//     for (let i = 0; i < products.length; i++) {
//       await ProductModel.findByIdAndUpdate(
//         products[i].productId,
//         { $inc: { sales: products[i].quantity } },
//         { new: true }
//       );
//     }

//     const savedOrder = await order.save();

//     await CartProductModel.deleteMany({ userId });

//     return res.status(201).json({
//       error: false,
//       success: true,
//       message:
//         paymentMethod === "cod"
//           ? "Order placed successfully (Cash on Delivery)"
//           : "Payment successful, order placed",
//       data: savedOrder,
//     });
//   } catch (error) {
//     console.error("Order error:", error);
//     return res.status(500).json({
//       error: true,
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// // ============================================================
// // GET ORDER LIST
// // ============================================================
// export const getOrderDetailsController = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const orderList = await OrderModel.find({ userId })
//       .sort({ createdAt: -1 })
//       .populate("delivery_address")
//       .populate("userId");

//     return res.status(200).json({
//       error: false,
//       success: true,
//       message: "Order list",
//       data: orderList,
//     });
//   } catch (error) {
//     console.error("Order list error:", error);
//     return res.status(500).json({
//       error: true,
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// // ============================================================
// // GET SINGLE ORDER
// // ============================================================
// export const getOrderByIdController = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { orderId } = req.params;

//     const order = await OrderModel.findOne({ _id: orderId, userId }).populate(
//       "delivery_address"
//     );

//     if (!order) {
//       return res.status(404).json({
//         error: true,
//         success: false,
//         message: "Order nahi mila",
//       });
//     }

//     return res.status(200).json({
//       error: false,
//       success: true,
//       data: order,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: true,
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// // ============================================================
// // UPDATE ORDER STATUS (admin)
// // PATCH /api/order/status/:orderId
// // ============================================================
// export const updateOrderStatusController = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { order_status } = req.body;

//     if (!order_status || !ORDER_STATUSES.includes(order_status)) {
//       return res.status(400).json({
//         success: false,
//         message: `Invalid order_status. Allowed: ${ORDER_STATUSES.join(", ")}`,
//       });
//     }

//     // ✅ FIX: jab order "Shipped" (out for delivery) hota hai, us waqt
//     // rider shop se order pick karta hai — pickupLocation isi moment pe
//     // set karo (shop ki location se). Pehle ye field kahin set hi nahi
//     // hota tha, isliye hamesha empty aata tha.
//     const updatePayload = { order_status };

//     if (order_status === "Shipped") {
//       const existingOrder = await OrderModel.findById(orderId).select("shopLocation");
//       const shop = existingOrder?.shopLocation;

//       if (shop?.latitude != null && shop?.longitude != null) {
//         updatePayload.pickupLocation = {
//           latitude: shop.latitude,
//           longitude: shop.longitude,
//           updatedAt: new Date(),
//         };
//       }
//     }

//     const updatedOrder = await OrderModel.findByIdAndUpdate(
//       orderId,
//       { $set: updatePayload },
//       { new: true, runValidators: true }
//     ).populate("delivery_address");

//     if (!updatedOrder) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     return res.status(200).json({
//       error: false,
//       success: true,
//       message: "Order status updated successfully",
//       data: updatedOrder,
//     });
//   } catch (error) {
//     console.error("Update order status error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Failed to update order status",
//     });
//   }
// };

// // ============================================================
// // RIDER: UPDATE LIVE LOCATION
// // PATCH /api/order/:orderId/rider-location
// // Body: { latitude, longitude }
// // ============================================================
// // ✅ FIX: "Order" undefined tha (sirf OrderModel import hai) -> ye function
// // har baar 500 crash karta tha, riderLocation kabhi save nahi hoti thi.
// export const updateRiderLocation = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { latitude, longitude } = req.body;

//     if (latitude == null || longitude == null) {
//       return res.status(400).json({ success: false, message: "latitude/longitude required" });
//     }

//     const updatedOrder = await OrderModel.findByIdAndUpdate(
//       orderId,
//       {
//         riderLocation: {
//           latitude: Number(latitude),
//           longitude: Number(longitude),
//           updatedAt: new Date(),
//         },
//       },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     return res.json({ success: true, data: updatedOrder.riderLocation });
//   } catch (error) {
//     console.error("Update rider location error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// // ============================================================
// // GET ORDER LOCATION (shop + pickup + rider) — this is what the
// // frontend's live-tracking map actually calls.
// // GET /api/order/:orderId/location
// // ============================================================
// export const getOrderLocation = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await OrderModel.findById(orderId).select(
//       "shopLocation pickupLocation riderLocation"
//     );

//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     return res.json({
//       success: true,
//       data: {
//         shopLocation: order.shopLocation || null,
//         pickupLocation: order.pickupLocation || null,
//         riderLocation: order.riderLocation || null,
//       },
//     });
//   } catch (error) {
//     console.error("Get order location error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };

// // ⚠️ REMOVED: updateDeliveryLocationController / getTrackingLocationController
// // Ye ek duplicate/parallel tracking system tha jo alag field
// // (deliveryLocation) use karta tha, jabki frontend riderLocation padhta
// // hai. Dono ek saath rakhne se rider ka app kabhi bhi galat field update
// // kar sakta tha aur map par kabhi kuch nahi dikhta. Ab sirf ek hi system
// // hai: updateRiderLocation (write) + getOrderLocation (read).
// //
// // Apni routes file mein confirm kar lo ki rider ka app / dashboard
// // PATCH /api/order/:orderId/rider-location ko hit kar raha hai
// // (updateRiderLocation), koi purana /tracking-location route nahi.

import OrderModel from "../models/orderModel.js";
import ProductModel from "../models/productModel.js";
import CartProductModel from "../models/cart.models.js"; // ⚠️ apne existing Cart model se replace karein
import { verifyStripePayment } from "./paymentController.js";
import { getNextOrderNumber } from "../utils/orderNumber.js";
// ✅ NEW: order placed hote hi customer + admin ko email bhejne ke liye
import { sendOrderPlacedEmail } from "../utils/sendEmail.js";

const ORDER_STATUSES = ["Pending", "Confirmed", "Preparing", "Shipped", "Delivered", "Cancelled"];

// ✅ FIX: Shop ki fixed location. Apni actual shop coordinates yahan daalo,
// ya .env se lo (SHOP_LAT / SHOP_LNG / SHOP_ADDRESS). Isse pehle ye
// createOrderController mein kahin set hi nahi ho raha tha, isliye
// shopLocation hamesha {} (empty) save hota tha.
const SHOP_LOCATION = {
  latitude: Number(process.env.SHOP_LAT) || 25.1211725,
  longitude: Number(process.env.SHOP_LNG) || 55.2423971,
  address: process.env.SHOP_ADDRESS || "Before dewa office - Building number 12 Office number - 1M-03 26th St - opposite ag cars workshop - Al Qouz Ind.fourth - Al Quoz - Dubai",
};

// ============================================================
// CREATE ORDER
// Body: { products, delivery_address, totalAmt, paymentMethod: "card" | "cod", paymentIntentId? }
// ============================================================
export const createOrderController = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      products,
      paymentMethod,
      paymentIntentId,
      delivery_address,
      totalAmt,
      date,
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        error: true,
        success: false,
        message: "User authenticated nahi hai",
      });
    }

    if (!products?.length || !delivery_address || !totalAmt || !paymentMethod) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Required fields missing (products, delivery_address, totalAmt, paymentMethod)",
      });
    }

    let paymentId = "";
    let payment_status = "";
    let order_status = "Pending";

    if (paymentMethod === "card") {
      if (!paymentIntentId) {
        return res.status(400).json({
          error: true,
          success: false,
          message: "paymentIntentId zaroori hai card payment ke liye",
        });
      }

      const verification = await verifyStripePayment(paymentIntentId, totalAmt);
      if (!verification.valid) {
        return res.status(402).json({
          error: true,
          success: false,
          message: verification.reason,
        });
      }

      paymentId = paymentIntentId;
      payment_status = "PAID";
      order_status = "Pending";
    } else if (paymentMethod === "cod") {
      paymentId = "";
      payment_status = "CASH ON DELIVERY";
      order_status = "Pending";
    } else {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Invalid paymentMethod — 'card' ya 'cod' hona chahiye",
      });
    }

    const orderId = await getNextOrderNumber();

    const order = new OrderModel({
      userId,
      orderId,
      paymentMethod,
      products,
      paymentId,
      payment_status,
      order_status,
      delivery_address,
      totalAmt,
      date:
        date ||
        new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      // ✅ FIX: ab har order create hote hi shop location bhi save hoti hai,
      // isliye map par shop marker turant available rahega.
      shopLocation: SHOP_LOCATION,
    });
    

    for (let i = 0; i < products.length; i++) {
      await ProductModel.findByIdAndUpdate(
        products[i].productId,
        { $inc: { sales: products[i].quantity } },
        { new: true }
      );
    }

    const savedOrder = await order.save();

    await CartProductModel.deleteMany({ userId });

    // ✅ NEW: customer ko order confirmation + aapko (admin) "New Order"
    // notification email. Fire-and-forget — email fail hone se order
    // response block nahi hona chahiye, isliye await nahi kiya.
    sendOrderPlacedEmail(savedOrder).catch((err) =>
      console.error("Order placed email failed:", err.message)
    );

    return res.status(201).json({
      error: false,
      success: true,
      message:
        paymentMethod === "cod"
          ? "Order placed successfully (Cash on Delivery)"
          : "Payment successful, order placed",
      data: savedOrder,
    });
  } catch (error) {
    console.error("Order error:", error);
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// ============================================================
// GET ORDER LIST
// ============================================================
export const getOrderDetailsController = async (req, res) => {
  try {
    const userId = req.userId;

    const orderList = await OrderModel.find({ userId })
      .sort({ createdAt: -1 })
      .populate("delivery_address")
      .populate("userId");

    return res.status(200).json({
      error: false,
      success: true,
      message: "Order list",
      data: orderList,
    });
  } catch (error) {
    console.error("Order list error:", error);
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// ============================================================
// GET SINGLE ORDER
// ============================================================
export const getOrderByIdController = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId } = req.params;

    const order = await OrderModel.findOne({ _id: orderId, userId }).populate(
      "delivery_address"
    );

    if (!order) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "Order nahi mila",
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// ============================================================
// UPDATE ORDER STATUS (admin)
// PATCH /api/order/status/:orderId
// ============================================================
export const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { order_status } = req.body;

    if (!order_status || !ORDER_STATUSES.includes(order_status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order_status. Allowed: ${ORDER_STATUSES.join(", ")}`,
      });
    }

    // ✅ FIX: jab order "Shipped" (out for delivery) hota hai, us waqt
    // rider shop se order pick karta hai — pickupLocation isi moment pe
    // set karo (shop ki location se). Pehle ye field kahin set hi nahi
    // hota tha, isliye hamesha empty aata tha.
    const updatePayload = { order_status };

    if (order_status === "Shipped") {
      const existingOrder = await OrderModel.findById(orderId).select("shopLocation");
      const shop = existingOrder?.shopLocation;

      if (shop?.latitude != null && shop?.longitude != null) {
        updatePayload.pickupLocation = {
          latitude: shop.latitude,
          longitude: shop.longitude,
          updatedAt: new Date(),
        };
      }
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { $set: updatePayload },
      { new: true, runValidators: true }
    ).populate("delivery_address");

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({
      error: false,
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update order status",
    });
  }
};

// ============================================================
// RIDER: UPDATE LIVE LOCATION
// PATCH /api/order/:orderId/rider-location
// Body: { latitude, longitude }
// ============================================================
export const updateRiderLocation = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { latitude, longitude } = req.body;

    if (latitude == null || longitude == null) {
      return res.status(400).json({ success: false, message: "latitude/longitude required" });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        riderLocation: {
          latitude: Number(latitude),
          longitude: Number(longitude),
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.json({ success: true, data: updatedOrder.riderLocation });
  } catch (error) {
    console.error("Update rider location error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// ============================================================
// GET ORDER LOCATION (shop + pickup + rider) — this is what the
// frontend's live-tracking map actually calls.
// GET /api/order/:orderId/location
// ============================================================
export const getOrderLocation = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await OrderModel.findById(orderId).select(
      "shopLocation pickupLocation riderLocation"
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.json({
      success: true,
      data: {
        shopLocation: order.shopLocation || null,
        pickupLocation: order.pickupLocation || null,
        riderLocation: order.riderLocation || null,
      },
    });
  } catch (error) {
    console.error("Get order location error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// ⚠️ REMOVED: updateDeliveryLocationController / getTrackingLocationController
// Ye ek duplicate/parallel tracking system tha jo alag field
// (deliveryLocation) use karta tha, jabki frontend riderLocation padhta
// hai. Dono ek saath rakhne se rider ka app kabhi bhi galat field update
// kar sakta tha aur map par kabhi kuch nahi dikhta. Ab sirf ek hi system
// hai: updateRiderLocation (write) + getOrderLocation (read).
//
// Apni routes file mein confirm kar lo ki rider ka app / dashboard
// PATCH /api/order/:orderId/rider-location ko hit kar raha hai
// (updateRiderLocation), koi purana /tracking-location route nahi.