import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/error.js";
import { myCache } from "../app.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import Order from "../models/order.js";
import { calculatePercentage, getInventory } from "../utils/features.js";

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

            // Getting Latest transaction for dashboard table
            const latestTransactionPromise = Order.find({}).select("orderItems discount total status").limit(4);

            const [
                thisMonthProducts, lastMonthProducts, 
                thisMonthUsers, lastMonthUsers, 
                thisMonthOrders, lastMonthOrders,
                productCount, userCount, allOrders,
                lastSixMonthOrder,
                categories,
                femaleUserCount,
                latestTransaction
            ] = await Promise.all([
                thisMonthProductsPromise, lastMonthProductsPromise,
                thisMonthUsersPromise, lastMonthUsersPromise,
                thisMonthOrdersPromise, lastMonthOrdersPromise,
                Product.countDocuments(), User.countDocuments(), Order.find().select("total"),
                lastSixMonthOrderPromise,
                Product.distinct("category"),
                User.countDocuments({gender : "female"}),
                latestTransactionPromise
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

            const categoryCount : Record<string, number>[] = await getInventory({categories, productCount})

            const userRatio = {
                male : userCount - femaleUserCount,
                female : femaleUserCount
            }

            // lastest transaction modification
            const latestTransactionInfo = latestTransaction.map(i => (
                {
                    _id : i._id,
                    discount : i.discount,
                    amount : i.total,
                    quantity : i.orderItems.length,
                    status : i.status
                }
            ))

            stats = {
                categoryCount,
                percentage,
                count,
                chart : {
                    order : orderMonthCount,
                    revenue : orderMonthRevenue
                },
                userRatio,
                latestTransaction : latestTransactionInfo
            }

            myCache.set("admin-stats", JSON.stringify(stats));

        }

        return res.status(200).json({
            success : true,
            stats
        })
    }
)

// Calculating Data for Pie Charts in Admin Dashboard
export const getPieCharts = asyncHandler(
    async(req : Request , res : Response , next : NextFunction) => {
        let charts;

        if(myCache.has("admin-pie-charts")){
            charts = JSON.parse(myCache.get("admin-pie-charts") as string);
        }
        else{

            const allOrdersPromise = Order.find({}).select([
                "total", "subTotal", "tax", "discount", "shippingCharges"
            ])

            const [processingOrder, shippedOrder, deliveredOrder, categories, productCount, outOfStock, allOrders] = await Promise.all([
                Order.countDocuments({status : "Processing"}),
                Order.countDocuments({status : "Shipped"}),
                Order.countDocuments({status : "Delivered"}),
                Product.distinct("category"),
                Product.countDocuments(),
                Product.countDocuments({ stock : 0 }),
                allOrdersPromise
            ])

            const orderFullfillment = {
                processing : processingOrder,
                shipped : shippedOrder,
                delivered : deliveredOrder
            }

            const productCategoriesInfo = await getInventory({categories, productCount})
            
            const stockAvailability = {
                inStock : productCount - outOfStock,
                outOfStock 
            }

            const grossIncome = allOrders.reduce((total, order) => {
                return total = total + (order.total || 0)
            }, 0)

            const discount = allOrders.reduce((total, order) => {
                return total = total + (order.discount || 0)
            }, 0)

            const burnt = allOrders.reduce((total, order) => {
                return total = total + (order.tax || 0)
            }, 0)

            const shippingCharges = allOrders.reduce((total, order) => {
                return total = total + (order.shippingCharges || 0)
            }, 0)

            const marketingCost = grossIncome * (30/100);

            const netMargin = grossIncome - discount - burnt - shippingCharges - marketingCost;
            const revenueDistribution = {
                netMargin,
                discount,
                shippingCharges,
                burnt,
                marketingCost
            }

            charts = {
                orderFullfillment,
                productCategoriesInfo,
                stockAvailability,
                revenueDistribution
            }

            myCache.set("admin-pie-charts", JSON.stringify(charts))
        }

        return res.status(200).json({
            charts
        })
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