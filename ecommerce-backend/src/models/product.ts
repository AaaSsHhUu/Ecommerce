import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter  product name"]
    },
    photo : {
        type : String,
        required : [true, "Please enter one photo"]
    },
    price : {
        type : Number,
        required : [true, "Enter Price"]
    },
    stock : {
        type : Number,
        required : [true, "Enter Stock"],
    },
    category : {
        type : String,
        required : [true, "Please Enter product category"],
        trim : true
    }
},{
    timestamps : true
})

const Product = mongoose.model("Product", productSchema);
export default Product;