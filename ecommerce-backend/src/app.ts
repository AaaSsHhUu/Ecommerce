import express from "express";
import useRoutes from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import errorMiddleware from "./middleware/error.js";

const app = express();
const port = 4000;

// Database connection
connectDB();

// middlewares
app.use(express.json());

app.get("/api/v1/", (req,res) => {
    res.send("This is root route")
})
// Using Routes
app.use("/api/v1/user",useRoutes);

// Error handling middleware
app.use(errorMiddleware);


app.listen(port,()  => {
    console.log(`Server is listening on port ${port}`);
})

