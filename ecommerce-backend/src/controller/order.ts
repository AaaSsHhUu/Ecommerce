import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/error.js";
import { newOrderSchema } from "../types/schema.js";
import ErrorHandler from "../utils/errorHandler.js";
import Order from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import { myCache } from "../app.js";

// new order
export const newOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      shippingInfo,
      orderItems,
      user,
      subTotal,
      shippingCharges,
      tax,
      discount,
      total,
    } = req.body;

    // Zod validation check
    const { success, error } = newOrderSchema.safeParse({
      shippingInfo,
      orderItems,
      user,
      subTotal,
      shippingCharges,
      tax,
      discount,
      total,
    });

    if (!success) {
      throw new ErrorHandler(error.message, 400);
    }

    // checking if there exist a user with given id
    const isUser = await User.findById(user);
    if (!isUser) {
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
      total,
    });

    if (!order) {
      throw new ErrorHandler(
        "Some error occured while placing the order, Please try again",
        500
      );
    }

    await reduceStock(orderItems);

    await invalidateCache({ product: true, order: true, admin: true, userId : user, productId : order.orderItems.map(i => String(i.productId)) });

    return res.status(201).json({
      message: "Order Placed successfully",
    });
  }
);

// my-order
export const myOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const key = `my-order-${id}`;

    let orders = [];

    if (myCache.has(key)) {
      orders = JSON.parse(myCache.get(key) as string);
    } else {
      orders = await Order.find({ user: id });
      if (!orders) {
        throw new ErrorHandler("No orders found", 404);
      }
      myCache.set(key, JSON.stringify(orders));
    }

    return res.status(200).json({
      success: true,
      orders,
    });
  }
);

// All-orders -- Admin
export const allOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const key = "all-orders";

    let allOrders = [];

    if(myCache.has(key)){
        allOrders = JSON.parse(myCache.get(key) as string);
    }
    else{
        allOrders = await Order.find().populate("user","name");
        myCache.set(key, JSON.stringify(allOrders));
    }

    return res.status(200).json({
        success : true,
        allOrders
    })

  }
);

// Get single order
export const getSingleOrder = asyncHandler(
    async(req : Request, res : Response, next : NextFunction) => {
        const {id} = req.params;
        const key = `order-${id}`;
        let order;

        if(myCache.has(key)){
            order = JSON.parse(myCache.get(key) as string);
        }
        else{
            order = await Order.findById(id).populate("user","name");
            if(!order){
                throw new ErrorHandler("Order not found with given id",404);
            }
            myCache.set(key, JSON.stringify(order));
        }

        return res.status(200).json({
            success : true,
            order
        })
    }
)

// process order
export const processOrder = asyncHandler(
    async (req : Request, res : Response, next : NextFunction) => {
        const {id} = req.params;

        const order = await Order.findById(id);

        if(!order){
            throw new ErrorHandler("Order not found", 404);
        }

        switch(order.status){
            case "Processing":
                order.status = "Shipped";
                break;
            case "Shipped" :
                order.status = "Delivered";
                break;
            default :
                order.status = "Delivered";
                break;
        }

        await order.save();

        await invalidateCache({product : false, order : true, admin : true, userId : order.user, orderId : String(order._id)})

        return res.status(200).json({
            success : true,
            message : "Order processed successfully"
        })

    }
)

// deleting order
export const deleteOrder = asyncHandler(
    async(req : Request, res : Response, next : NextFunction) => {
        const {id} = req.params;

        const order = await Order.findByIdAndDelete(id);
        if(!order){
            throw new ErrorHandler("Order not found",404);
        }

        await invalidateCache({product : false, order : true, admin : true, userId : order.user, orderId : String(order._id)})

        return res.status(200).json({
            success : true,
            message : "Order deleted successfully"
        })
    }
)