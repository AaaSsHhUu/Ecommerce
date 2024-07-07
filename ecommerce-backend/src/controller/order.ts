import {Request, Response, NextFunction} from "express";
import { asyncHandler } from "../middleware/error.js";
import {newOrderSchema} from "../types/schema.js"
import ErrorHandler from "../utils/errorHandler.js";
import Order from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";

export const newOrder = asyncHandler(
    async (req : Request, res : Response, next : NextFunction) => {
        const {shippingInfo,orderItems, user, subTotal, tax, discount, total} = req.body;
        const {success, error} = newOrderSchema.safeParse({shippingInfo,orderItems, user, subTotal, tax, discount, total});

        if(!success){
            console.log("zod Error : ", error);
            throw new ErrorHandler("Invalid Inputs", 400);
        }

        const order = await Order.create({
            shippingInfo,
            orderItems,
            user,
            subTotal,
            tax,
            discount,
            total
        })

        await reduceStock(orderItems);

        await invalidateCache({ product:true, order : true, admin : true })

        return res.status(201).json({
            message : "Order Created successfully",

        })
    }
)
