import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/error.js";
import Coupon from "../models/coupon.js";
import ErrorHandler from "../utils/errorHandler.js";
import { couponSchema } from "../types/schema.js";

// Create new Coupon
export const newCoupon = asyncHandler(
    async(req : Request, res : Response , next : NextFunction) => {
        const {coupon, amount} = req.body;

        const {success,error} = couponSchema.safeParse({coupon,amount});

        if(!success){
            console.log("zod Error", error);
            throw new ErrorHandler("Invalid Inputs", 400);
        }

        const newCoupon = await Coupon.create({coupon, amount});

        if(!newCoupon){
            throw new ErrorHandler("Some Error Occured ", 500);
        }

        return res.status(201).json({
            success : true,
            message :  `Coupon ${coupon} generated successfully`
        })
    }
)

// apply coupon
export const applyCoupon = asyncHandler(
    async(req : Request, res : Response, next : NextFunction) => {
        const { coupon } = req.query;

        const discount = await Coupon.findOne({coupon : coupon});

        if(!discount){
            throw new ErrorHandler("Invalid Coupon code",400);
        }

        return res.status(200).json({
            success : true,
            discount : discount.amount
        })
    }
)

export const allCoupons = asyncHandler(
    async( req : Request , res : Response , next : NextFunction)=>{
        const coupons = await Coupon.find();

        if(!coupons){
            throw new ErrorHandler("No coupons found",404);
        }

        return res.status(200).json({
            success : true,
            coupons
        })
    }
)