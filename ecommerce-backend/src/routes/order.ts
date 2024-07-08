import express from "express";
import { allOrders, getSingleOrder, myOrder, newOrder } from "../controller/order.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", newOrder);

router.get("/my-order/:id", myOrder);

router.get("/all-orders",isAuthenticated, isAdmin, allOrders);

router.route("/:id").get(getSingleOrder)

export default router;