import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem } from "../../types/types";

const initialState : CartReducerInitialState = {
    loading : false,
    shippingCharges : 0,
    subtotal : 0,
    tax : 0,
    discount : 0,
    total : 0,
    shippingInfo : {
        address : "",
        city : "",
        state : "",
        country : "",
        pinCode : ""
    },
    cartItems : []
};

const cartReducer = createSlice({
    name : "cartReducer",
    initialState,
    reducers : {
        
     }
})

export default {} = cartReducer.actions;