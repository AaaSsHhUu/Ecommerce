import {Request, Response, NextFunction} from "express";
import { asyncHandler } from "../middleware/error.js";
import {newOrderSchema} from "../types/schema.js"
import ErrorHandler from "../utils/errorHandler.js";
import Order from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import { myCache } from "../app.js";

// new order
export const newOrder = asyncHandler(
    async (req : Request, res : Response, next : NextFunction) => {
        const {shippingInfo,orderItems, user, subTotal, shippingCharges , tax, discount, total} = req.body;

        console.log("req body : ", req.body);
        
        // Zod validation check
        const {success, error} = newOrderSchema.safeParse({shippingInfo,orderItems, user, subTotal, shippingCharges, tax, discount, total});

        if(!success){
            throw new ErrorHandler(error.message, 400);
        }

        // Checking if user id is valid
        if(!mongoose.isValidObjectId(user)){
            throw new ErrorHandler("Invalid user id", 400);
        }

        // checking if there exist a user with given id
        const isUser = await User.findById(user);
        if(!isUser){
            throw new ErrorHandler("User doesn't exist", 400);
        }

        const order = await Order.create({
            shippingInfo,
            orderItems,
            user,
            subTotal,
            shippingCharges,
            tax,
            discount,
            total
        })

        if(!order){
            throw new ErrorHandler("Some error occured while placing the order, Please try again", 500);
        }

        await reduceStock(orderItems);

        await invalidateCache({ product:true, order : true, admin : true });

        return res.status(201).json({
            message : "Order Placed successfully",
        })
    }
)


// my-order 
export const myOrder = asyncHandler(
    async (req : Request, res : Response, next : NextFunction) => {
        const {id} = req.params;

        const key = `my-order-${id}`;

        let orders = [];

        if(myCache.has(key)){
            orders = JSON.parse(myCache.get(key) as string);
        }
        else{
            orders = await Order.find({user : id});
            if(!orders){
                throw new ErrorHandler("No orders found", 404);
            }
            myCache.set(key, JSON.stringify(orders));
        }

        return res.status(201).json({
            success : true,
            orders
        })
    }
)