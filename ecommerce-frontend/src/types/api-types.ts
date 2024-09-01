import { Bar, CartItem, Coupon, Line, Order, Pie, Product, ShippingInfo, StatsType, User } from "./types";

export interface MessageResponse{
    success : boolean;
    message : string;
}

export type AxiosGetUserResponse = {
    success : boolean;
    user : User;
}

export type AllUserResponse = {
    success : boolean;
    users : User[];
}

export type ProductsResponse = {
    success : boolean;
    products : Product[];
}

export type CategoryResponse = {
    success : boolean;
    categories : string[];
}

export type SearchProductsResponse = ProductsResponse & {
    totalPages : number;
}

export type AllOrdersResponse = {
    success : boolean;
    orders : Order[];
}

export type OrderDetailResponse = {
    success : boolean;
    order : Order;
}

export type StatsResponse = {
    success : boolean;
    stats : StatsType;
}

export type PieResponse = {
    success : boolean;
    charts : Pie;
}

export type BarResponse = {
    success : boolean;
    charts : Bar;
}

export type LineResponse = {
    success : boolean;
    charts : Line;
}

export type CouponResponse = {
    success : boolean;
    coupons : Coupon[];
}

export type SearchProductsQuery = {
    price ?: number;
    page ?: number;
    category ?: string;
    search ?: string;
    sort ?: string;
}

export type CustomError = {
    status : number;
    data : {
        success : boolean;
        message : string;
    }
}

export type NewProductRequest = {
    formData : FormData;
    id : string;
}

export type ProductDetails = {
    success : boolean;
    product : Product;
}

export type UpdateProductRequest = {
    userId : string;
    productId : string;
    formData : FormData;
}

export type DeleteProductRequest = {
    userId : string;
    productId : string;
}

export type NewOrderRequest = {
    shippingInfo : ShippingInfo;
    orderItems : CartItem[];
    subTotal : number;
    tax : number;
    shippingCharges : number;
    discount : number;
    total : number;
    user : string;
}

export type UpdateOrderRequest = {
    userId : string;
    orderId : string;
}

export type DeleteUserRequest = {
    userId : string;
    adminId : string;
}

export type NewCouponRequest = {
    couponInfo : {
        coupon : string;
        amount : number;
    },
    adminId : string;
}

export type DeleteCouponRequest = {
    couponId : string;
    adminId : string;
}