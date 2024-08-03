import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse, NewOrderRequest } from "../../types/api-types-";

export const orderAPI = createApi({
    reducerPath : "orderApi",
    baseQuery : fetchBaseQuery({ 
        baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/order`
    }),
    endpoints : (builder) => ({
        newOrder : builder.mutation<MessageResponse, NewOrderRequest>({
            query : (order) => ({
                url : "/new",
                method : "POST",
                body : order
            })
        }),
        myOrder : builder.query<MessageResponse, string>({
            query : (id) => (`/my-order/${id}`)
        })
    })
})

export const {useNewOrderMutation, useMyOrderQuery} = orderAPI