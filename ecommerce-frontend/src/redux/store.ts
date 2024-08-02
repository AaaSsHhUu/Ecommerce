import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { productApi } from "./api/productApi";
import { cartReducer } from "./reducer/cartReducer";


export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer : {
        [userAPI.reducerPath] : userAPI.reducer,
        [productApi.reducerPath] : productApi.reducer,

        [userReducer.name] : userReducer.reducer,
        [cartReducer.name] : cartReducer.reducer
    },
    middleware : (defaultMiddlewares) => defaultMiddlewares().concat(userAPI.middleware, productApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>