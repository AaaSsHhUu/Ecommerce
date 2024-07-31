import express from "express";
import { allCoupons, applyCoupon, createPaymentIntent, deleteCoupon, getCoupon, newCoupon, updateCoupon } from "../controller/payment.js";
import { adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", createPaymentIntent);

router.post("/coupon/new",adminOnly, newCoupon);

router.post("/discount", applyCoupon);

router.get("/coupon/all/",adminOnly, allCoupons);

router.route("/coupon/:id")
    .get(adminOnly, getCoupon)
    .put(adminOnly, updateCoupon)
    .delete(adminOnly, deleteCoupon)

export default router;