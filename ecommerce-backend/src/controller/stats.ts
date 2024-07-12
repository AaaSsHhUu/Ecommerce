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

            const sixMonthAgo = new Date();
            sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

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

            const lastSixMonthOrderPromise = Order.find({
                createdAt : {
                    $gte : sixMonthAgo,
                    $lte : today
                }
            })

            const [
                thisMonthProducts, lastMonthProducts, 
                thisMonthUsers, lastMonthUsers, 
                thisMonthOrders, lastMonthOrders,
                productCount, userCount, allOrders,
                lastSixMonthOrder,
                categories
            ] = await Promise.all([
                thisMonthProductsPromise, lastMonthProductsPromise,
                thisMonthUsersPromise, lastMonthUsersPromise,
                thisMonthOrdersPromise, lastMonthOrdersPromise,
                Product.countDocuments(), User.countDocuments(), Order.find().select("total"),
                lastSixMonthOrderPromise,
                Product.distinct("category")
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

            // Calculating data for dashboard chart arrays (Transaction and Revenue)
            const orderMonthCount = new Array(6).fill(0);
            const orderMonthRevenue = new Array(6).fill(0);

            lastSixMonthOrder.forEach((order) => {
                const creationDate = order.createdAt;
                const monthDiff = creationDate.getMonth() - today.getMonth()

                if(monthDiff < 6){
                    orderMonthCount[5 - monthDiff] += 1;
                    orderMonthRevenue[5 - monthDiff] += order.total;
                }
            })

            // calculating category and their count
            const categoryCountPromise = categories.map((category) => Product.countDocuments({category}))

            const categoryCount = await Promise.all(categoryCountPromise);

            const inventory : Record<string, number>[] = [];
            // Record : It allows you to define an object where the keys are of a specific type and the values are of another specific type

            categories.forEach((category, idx) => {
                inventory.push({
                    [category] : categoryCount[idx]                    
                })
            })
            stats = {
                inventory,
                percentage,
                count,
                chart : {
                    order : orderMonthCount,
                    revenue : orderMonthRevenue
                }
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