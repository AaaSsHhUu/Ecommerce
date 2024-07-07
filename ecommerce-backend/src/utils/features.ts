import mongoose from "mongoose";
import { InvalidateCacheProps } from "../types/types.js";
import Product from "../models/product.js";
import { myCache } from "../app.js";
import { OrderItemType } from "../types/schema.js";
import ErrorHandler from "./errorHandler.js";

export const connectDB = async (uri : string) => {
    mongoose.connect(uri,{dbName : "Ecommerce"})
    .then((c) => console.log(`Connected to DB, host : ${c.connection.host}`))
    .catch((err) => console.log("Error while connecting DB : ",err))
}

export const invalidateCache = async ({product,order,admin} : InvalidateCacheProps) => {
    
    if(product){
        const productKeys : string[] = ["latest-products", "categories", "admin-products"];
        const productsIds = await Product.find().select("_id");
        productsIds.forEach(i => {
            productKeys.push(`product-${i._id}`);
        })
        myCache.del(productKeys);
    }
}

export const reduceStock = async (orderItem : OrderItemType[]) => {
    for(let i=0 ; i < orderItem.length ; i++){
        let order = orderItem[i];
        const product = await Product.findById(order.productId);

        if(!product){
            throw new ErrorHandler("Product not found", 404);
        }

        product.stock -= order.quantity;
        await product.save();
    }
}