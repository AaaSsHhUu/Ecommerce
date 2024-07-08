import express from "express";
import { myOrder, newOrder } from "../controller/order.js";

const router = express.Router();

router.post("/new", newOrder);

router.get("/my-order/:id", myOrder);

export default router;