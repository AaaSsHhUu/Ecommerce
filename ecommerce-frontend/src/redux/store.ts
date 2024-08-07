import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { productApi } from "./api/productApi";
import { cartReducer } from "./reducer/cartReducer";
import { orderAPI } from "./api/orderApi";
import { dashboardApi } from "./api/dashboardApi";


export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer : {
        [userAPI.reducerPath] : userAPI.reducer,
        [productApi.reducerPath] : productApi.reducer,
        [orderAPI.reducerPath] : orderAPI.reducer,
        [dashboardApi.reducerPath] : dashboardApi.reducer,

        [userReducer.name] : userReducer.reducer,
        [cartReducer.name] : cartReducer.reducer
    },
    middleware : (defaultMiddlewares) => defaultMiddlewares().concat(userAPI.middleware, productApi.middleware, orderAPI.middleware, dashboardApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
// The ReturnType utility type is used to extract the return type of a function type. 