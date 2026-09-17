import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./Config/ConnectDb.js";
import userRouter from "./route/userRoute.js";
import categoryRouter from "./route/categoryRoute.js";
import productRouter from "./route/productRoute.js";
import cartRouter from "./route/cartRoute.js";
import addressRouter from "./route/addressRoute.js";
import myListRouter from "./route/myListRoute.js";
import multipleDeletedRouter from "./route/multipalDeleted.js";
import homeBannerRouter from "./route/homeBannerRoutes.js";
import adHomeBannerRouter from "./route/adHomeBannerRoutes.js";
import blogRouter from "./route/blogRoute.js";
import orderRouter from "./route/orderRoutes.js";
import paymentRouter from "./route/paymentRoute.js";
import mediaRoutes from "./route/mediaRoutes.js"
import aiRouter from "./models/aiRoute.js";
import returnRouter from "./route/return.route.js";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import contactRouter from "./route/contactRoute.js";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.get("/", (req, res) => {
  res.json({
    message: "Server is running" + process.env.PORT,
  });
});

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/my-list", myListRouter);
app.use("/api/deleteMultiple", multipleDeletedRouter);
app.use("/api/homeBanner", homeBannerRouter);
app.use("/api/adHomeBanner", adHomeBannerRouter);
app.use("/api/blog", blogRouter);
app.use("/api/order",orderRouter)
app.use("/api/payment",paymentRouter)
app.use("/api/media",mediaRoutes)
app.use("/api/return",returnRouter)
app.use("/api/ai",aiRouter)
app.use("/api/contact", contactRouter);


app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
});
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running", process.env.PORT);
  });
});
