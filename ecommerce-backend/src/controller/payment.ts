import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/error.js";
import Coupon from "../models/coupon.js";
import ErrorHandler from "../utils/errorHandler.js";
import { couponSchema } from "../types/schema.js";
import { stripe } from "../app.js";


export const createPaymentIntent = asyncHandler(
    async (req : Request, res : Response, next : NextFunction) => {
        const {amount} = req.body;
    
        if(!amount){
            throw new ErrorHandler("Please enter amount ", 400);
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount : Number(amount) * 100, // stripe takes the smallest unit of any currency
            currency : "inr"
        })

        return res.status(200).json({
            success : true,
            clientSecret : paymentIntent.client_secret
        })
    }
)


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

//  Getting all coupons --Admin
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

export const getCoupon = asyncHandler(
    async (req : Request, res : Response, next : NextFunction ) => {
        const {id} = req.params;
        const coupon = await Coupon.findById(id);

        if(!coupon){
            throw new ErrorHandler("Invalid Coupon ID", 400);
        }

        return res.status(200).json({
            success : true,
            coupon
        })
    }
)

// Deleting coupon
export const deleteCoupon = asyncHandler(
    async(req : Request , res : Response , next : NextFunction) => {
        const {id} = req.params;

        const coupon = await Coupon.findByIdAndDelete(id);

        if(!coupon){
            throw new ErrorHandler("Invalid ID", 400);
        }

        return res.status(200).json({
            success : true,
            message : "Coupon deleted successfully"
        })
    }
)