import mongoose from "mongoose";
import { InvalidateCacheProps } from "../types/types.js";
import Product from "../models/product.js";
import { myCache } from "../app.js";

export const connectDB = async () => {
    mongoose.connect("mongodb://localhost:27017/",{dbName : "Ecommerce"})
    .then((c) => console.log(`Connected to DB, host : ${c.connection.host}`))
    .catch((err) => console.log("Error while connecting DB : ",err))
}

export const invalidateCache = async ({product,order,admin} : InvalidateCacheProps) => {
    const productKeys : string[] = ["latest-products", "categories", "admin-products"];

    if(product){
        const productsIds = await Product.find().select("_id");
        productsIds.forEach(i => {
            productKeys.push(`product-${i._id}`);
        })
        myCache.del(productKeys);
    }

}