import express from "express";
import { allCoupons, applyCoupon, newCoupon } from "../controller/payment.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/coupon/new", newCoupon);
router.post("/discount", applyCoupon);

router.get("/coupon/all",isAuthenticated, isAdmin, allCoupons);

export default router;