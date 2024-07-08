import express from "express";
import { allOrders, myOrder, newOrder } from "../controller/order.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", newOrder);

router.get("/my-order/:id", myOrder);

router.get("/all-orders",isAuthenticated, isAdmin, allOrders);

export default router;