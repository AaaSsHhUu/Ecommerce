import express from "express";
import { applyCoupon, newCoupon } from "../controller/payment.js";

const router = express.Router();

router.post("/coupon/new", newCoupon);
router.post("/discount", applyCoupon);

export default router;