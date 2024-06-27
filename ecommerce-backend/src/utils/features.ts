import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.connect("mongodb://localhost:27017/",{dbName : "Ecommerce"})
    .then((c) => console.log(`Connected to DB, host : ${c.connection.host}`))
    .catch((err) => console.log("Error while connecting DB : ",err))
}