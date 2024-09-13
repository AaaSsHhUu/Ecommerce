import express from "express";
import dotenv from "dotenv";
dotenv.config({
    path : "./.env"
});
import { connectDB } from "./utils/features.js";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import NodeCache from "node-cache";
import morgan from "morgan";
import Stripe from "stripe";
import cors from "cors";
import {v2 as cloudinary} from 'cloudinary';

// Routes
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";
import dashboardRoutes from "./routes/stats.js"

const app = express();
const port = process.env.PORT || 4000;
const stripeKey = process.env.STRIPE_KEY || "";

// Database connection
connectDB(process.env.DB_URL as string);

export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache({stdTTL : 600, checkperiod : 600}); // both in seconds
// stdTTL -> standard time to live
// checkperiod -> time at which the cache will check for expired items and remove them

// middlewares
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"))
app.use(express.json());

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

app.get("/api/v1/", (req,res) => {
    res.send("This is root route")
})
// Using Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


app.use("/uploads",express.static("uploads"))
// Error handling middleware
app.use(errorMiddleware);


app.listen(port,()  => {
    console.log(`Server is listening on port ${port}`);
})

