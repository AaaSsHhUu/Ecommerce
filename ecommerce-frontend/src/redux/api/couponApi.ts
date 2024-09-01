import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { CouponResponse, DeleteCouponRequest, MessageResponse, NewCouponRequest } from "../../types/api-types";

export const couponApi = createApi({
    reducerPath : "couponApi",
    baseQuery : fetchBaseQuery({
        baseUrl :  `${import.meta.env.VITE_SERVER}/api/v1/payment/coupon`
    }),
    tagTypes : ["coupon"],
    endpoints : (builder) => ({
        allCoupons : builder.query<CouponResponse, string>({
            query : (adminId) => (`/all?id=${adminId}`),
            providesTags : ["coupon"]
        }),

        newCoupon : builder.mutation<MessageResponse, NewCouponRequest>({
            query : ({couponInfo, adminId}) => ({
                url : `/new?id=${adminId}`,
                method : "POST",
                body : couponInfo
            }),
            invalidatesTags : ["coupon"]
        }),

        deleteCoupon : builder.mutation<MessageResponse, DeleteCouponRequest>({
            query : ({couponId, adminId}) => ({
                url : `/${couponId}?id=${adminId}`,
                method : "DELETE"
            }),
            invalidatesTags : ["coupon"]
        })
    })
})

export const {useAllCouponsQuery, useNewCouponMutation, useDeleteCouponMutation} = couponApi;