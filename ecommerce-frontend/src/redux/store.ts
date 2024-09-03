import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { productApi } from "./api/productApi";
import { cartReducer } from "./reducer/cartReducer";
import { orderAPI } from "./api/orderApi";
import { dashboardApi } from "./api/dashboardApi";
import { couponApi } from "./api/couponApi";


export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer : {
        // Api
        [userAPI.reducerPath] : userAPI.reducer,
        [productApi.reducerPath] : productApi.reducer,
        [orderAPI.reducerPath] : orderAPI.reducer,
        [dashboardApi.reducerPath] : dashboardApi.reducer,
        [couponApi.reducerPath] : couponApi.reducer,
        // Reducer
        [userReducer.name] : userReducer.reducer,
        [cartReducer.name] : cartReducer.reducer
    },
    middleware : (defaultMiddlewares) => defaultMiddlewares().concat(userAPI.middleware, productApi.middleware, orderAPI.middleware, dashboardApi.middleware, couponApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
// The ReturnType utility type is used to extract the return type of a function type. 