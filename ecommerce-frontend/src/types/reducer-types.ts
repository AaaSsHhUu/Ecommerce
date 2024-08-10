import { CartItem, ShippingInfo, User } from "./types";

export interface UserReducerInitialState{
    user : User | null;
    loading : boolean;
}

export interface CartReducerInitialState{
    loading : boolean;
    shippingCharges : number;
    subTotal : number;
    tax : number;
    discount : number;
    total : number;
    shippingInfo : ShippingInfo;
    cartItems : CartItem[];
}