import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllOrdersResponse, MessageResponse, NewOrderRequest } from "../../types/api-types-";

export const orderAPI = createApi({
    reducerPath : "orderApi",
    baseQuery : fetchBaseQuery({ 
        baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/order`
    }),
    tagTypes : ["orders"],
    endpoints : (builder) => ({
        
        newOrder : builder.mutation<MessageResponse, NewOrderRequest>({
            query : (order) => ({
                url : "/new",
                method : "POST",
                body : order
            }),
            invalidatesTags : ["orders"]
        }),

        myOrder : builder.query<AllOrdersResponse, string>({
            query : (id) => (`/my-order/${id}`),
            providesTags : ["orders"]
        }),
        
        allOrders : builder.query<AllOrdersResponse,string>({
            query : (id) => (`/all-orders?id=${id}`),
            providesTags : ["orders"]
        }),

        orderDetails : builder.query<AllOrdersResponse, string>({
            query : (id) => (`/${id}`),
            providesTags : ["orders"]
        })
    })
})

export const {useNewOrderMutation, useMyOrderQuery} = orderAPI