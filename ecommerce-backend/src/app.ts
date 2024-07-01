import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./utils/features.js";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.js"
import userRoutes from "./routes/user.js";

const app = express();
const port = 4000;

// Database connection
connectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.get("/api/v1/", (req,res) => {
    res.send("This is root route")
})
// Using Routes
app.use("/api/v1/user",userRoutes);

// admin routes
app.use("/api/v1/admin",adminRoutes);

// Error handling middleware
app.use(errorMiddleware);


app.listen(port,()  => {
    console.log(`Server is listening on port ${port}`);
})

