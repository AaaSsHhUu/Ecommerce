import mongoose from "mongoose";
import { InvalidateCacheProps } from "../types/types.js";
import Product from "../models/product.js";
import { myCache } from "../app.js";
import { OrderItemType } from "../types/schema.js";
import ErrorHandler from "./errorHandler.js";
import Order from "../models/order.js";

export const connectDB = async (uri: string) => {
  mongoose
    .connect(uri, { dbName: "Ecommerce" })
    .then((c) => console.log(`Connected to DB, host : ${c.connection.host}`))
    .catch((err) => console.log("Error while connecting DB : ", err));
};

export const invalidateCache = async ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "admin-products",
    ];

    if(typeof productId === "string"){
      productKeys.push(`product-${productId}`)
    }
    if(typeof productId === "object"){
        productId.forEach(i => productKeys.push(`product-${i}`))
    }

    myCache.del(productKeys);
  }

  if (order) {
    const orderKeys: string[] = [
      "all-orders",
      `my-order-${userId}`,
      `order-${orderId}`,
    ];
    myCache.del(orderKeys);
  }
};

export const reduceStock = async (orderItem: OrderItemType[]) => {
  for (let i = 0; i < orderItem.length; i++) {
    let order = orderItem[i];
    const product = await Product.findById(order.productId);

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    product.stock -= order.quantity;
    await product.save();
  }
};

export const calculatePercentage = (thisMonth : number, lastMonth : number) => {
    if(lastMonth === 0) return thisMonth*100;
    const percentage = (thisMonth / lastMonth) * 100;
    return Number(percentage.toFixed(0));
}

export const getInventory = async ({categories, productCount} : {categories : string[], productCount : number}) => {
    // calculating category and their count
    const categoryCountPromise = categories.map((category) => Product.countDocuments({category}))

    const categoryCount = await Promise.all(categoryCountPromise);

    const inventory : Record<string, number>[] = [];
    // Record : It allows you to define an object where the keys are of a specific type and the values are of another specific type

    categories.forEach((category, idx) => {
        inventory.push({
            [category] : Math.round((categoryCount[idx] / productCount) * 100)
        })
    })

    return inventory;
}