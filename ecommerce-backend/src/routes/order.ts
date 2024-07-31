import express from "express";
import { allOrders, deleteOrder, getSingleOrder, myOrder, newOrder, processOrder } from "../controller/order.js";
import { adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", newOrder);

router.get("/my-order/:id", myOrder);

router.get("/all-orders/:id",adminOnly, allOrders);

router.route("/:id")
    .get(getSingleOrder)
    .put(adminOnly, processOrder)
    .delete(adminOnly, deleteOrder)

export default router;