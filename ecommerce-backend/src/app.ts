import express from "express";
import useRoutes from "./routes/user.js";

const app = express();
const port = 4000;


// Using Routes
app.use("/api/v1/user",useRoutes);

app.listen(port,()  => {
    console.log(`Server is listening on port ${port}`);
})

