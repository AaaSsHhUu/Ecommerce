import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryResponse, ProductsResponse, SearchProductsQuery, SearchProductsResponse } from "../../types/api-types-";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product`,
    credentials : "include"
  }),
  endpoints: (builder) => ({
    latestProducts : builder.query<ProductsResponse, string>({
      query: () => "/latest",
    }),

    allProducts : builder.query<ProductsResponse, string>({
      query: () => "/admin-products",
    }),

    categories : builder.query<CategoryResponse, string>({
      query: () => "/categories",
    }),

    searchProducts : builder.query<SearchProductsResponse, SearchProductsQuery>({
        query : ({search, price, page, category, sort}) => {
            let baseQuery = `/all?search=${search}&page=${page}`;
            
            if(price) baseQuery += `&price=${price}`;
            if(category) baseQuery += `&category=${category}`;
            if(sort) baseQuery += `&sort=${sort}`;

            return baseQuery;
        }
    })
  }),
});

export const { useLatestProductsQuery, useAllProductsQuery, useCategoriesQuery, useSearchProductsQuery } = productApi;

/*
  # For queries, you usually destructure the result like this:
      const { data, isLoading } = useGetSomeDataQuery();

  # For mutations, the hook returns an array where the first element is the trigger function and the second element is an object containing the mutation state. Therefore, you should use array destructuring.
      const [triggerFunction, { data, isLoading }] = useMutation();

*/
