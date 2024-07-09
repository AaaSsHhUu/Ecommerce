import express from "express";
import { newCoupon } from "../controller/payment.js";

const router = express.Router();

router.post("/coupon/new", newCoupon);

export default router;