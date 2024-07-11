import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/error.js";
import { myCache } from "../app.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import Order from "../models/order.js";
import { calculatePercentage } from "../utils/features.js";

export const getDashboardStats = asyncHandler(
    async(req : Request , res : Response , next : NextFunction) => {
        
        let stats;
        // Getting stats from cache (if present)
        if(myCache.has("admin-stats")){
            stats = JSON.parse(myCache.get("admin-stats") as string);
        }
        else{
            const today = new Date();

            const thisMonth = {
                start : new Date(today.getFullYear(), today.getMonth(), 1),
                end : today
            }

            const lastMonth = {
                start : new Date(today.getFullYear(), today.getMonth() - 1 , 1),
                end : new Date(today.getFullYear(), today.getMonth(), 0) // 0 in the end -> last day of previous month
            }

            // Calculating Products, users and order between last month and current month.
            const thisMonthProductsPromise = Product.find({
                createdAt : {
                    $gte : thisMonth.start,
                    $lte : thisMonth.end
                }
            })

            const lastMonthProductsPromise = Product.find({
                createdAt : {
                    $gte : lastMonth.start,
                    $lte : lastMonth.end
                }
            })
            const thisMonthUsersPromise = User.find({
                createdAt : {
                    $gte : thisMonth.start,
                    $lte : thisMonth.end
                }
            })

            const lastMonthUsersPromise = User.find({
                createdAt : {
                    $gte : lastMonth.start,
                    $lte : lastMonth.end
                }
            })
            const thisMonthOrdersPromise = Order.find({
                createdAt : {
                    $gte : thisMonth.start,
                    $lte : thisMonth.end
                }
            })

            const lastMonthOrdersPromise = Order.find({
                createdAt : {
                    $gte : lastMonth.start,
                    $lte : lastMonth.end
                }
            })

            const [
                thisMonthProducts, lastMonthProducts, 
                thisMonthUsers, lastMonthUsers, 
                thisMonthOrders, lastMonthOrders,
                productCount, userCount, allOrders
            ] = await Promise.all([
                thisMonthProductsPromise, lastMonthProductsPromise,
                thisMonthUsersPromise, lastMonthUsersPromise,
                thisMonthOrdersPromise, lastMonthOrdersPromise,
                Product.countDocuments(), User.countDocuments(),
                Order.find().select("total")
            ])

            // Calculating Revenue generated between last month and current month

            const thisMonthRevenue = thisMonthOrders.reduce((total, order) => {
                return total = total + order.total
            }, 0)
            const lastMonthRevenue = lastMonthOrders.reduce((total, order) => {
                return total = total + order.total
            }, 0)

            const revenue = allOrders.reduce((total, order) => {
                return total = total + order.total
            }, 0)

            // Calculating percentage change in revenue, products, user and orders
            const percentage = {
                revenue : calculatePercentage(thisMonthRevenue, lastMonthRevenue),
                products : calculatePercentage(thisMonthProducts.length,lastMonthProducts.length),
                users : calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
                orders : calculatePercentage(thisMonthOrders.length, lastMonthOrders.length)
            }

            const count = {
                revenue,
                product : productCount,
                user : userCount,
                order : allOrders.length
            }


            stats = {
                percentage,
                count
            }

        }

        return res.status(200).json({
            success : true,
            stats
        })
    }
)
export const getPieCharts = asyncHandler(
    async(req : Request , res : Response , next : NextFunction) => {
        
    }
)
export const getBarCharts = asyncHandler(
    async(req : Request , res : Response , next : NextFunction) => {
        
    }
)
export const getLineCharts = asyncHandler(
    async(req : Request , res : Response , next : NextFunction) => {
        
    }
)