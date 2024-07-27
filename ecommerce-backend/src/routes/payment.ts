import express from "express";
import { allCoupons, applyCoupon, createPaymentIntent, deleteCoupon, newCoupon } from "../controller/payment.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", createPaymentIntent);

router.post("/coupon/new",isAuthenticated, isAdmin, newCoupon);

router.post("/discount", applyCoupon);

router.get("/coupon/all",isAuthenticated, isAdmin, allCoupons);

router.delete("/coupon/:id",isAuthenticated, isAdmin, deleteCoupon);

export default router;