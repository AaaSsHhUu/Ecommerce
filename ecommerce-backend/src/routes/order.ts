import express from "express";
import { newOrder } from "../controller/order.js";

const router = express.Router();

router.post("/new", newOrder);

export default router;