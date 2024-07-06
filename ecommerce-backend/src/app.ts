import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./utils/features.js";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import NodeCache from "node-cache";

// Routes
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";

const app = express();
const port = 4000;

// Database connection
connectDB();

export const myCache = new NodeCache({stdTTL : 600, checkperiod : 600}); // both in seconds
// stdTTL -> standard time to live
// checkperiod -> time at which the cache will check for expired items and remove them

// middlewares
app.use(express.json());
app.use(cookieParser());

app.get("/api/v1/", (req,res) => {
    res.send("This is root route")
})
// Using Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);



app.use("/uploads",express.static("uploads"))
// Error handling middleware
app.use(errorMiddleware);


app.listen(port,()  => {
    console.log(`Server is listening on port ${port}`);
})

