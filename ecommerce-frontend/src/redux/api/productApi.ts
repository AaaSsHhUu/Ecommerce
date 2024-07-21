import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductsResponse } from "../../types/api-types-";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product`,
  }),
  endpoints: (builder) => ({
    latestProducts: builder.query<ProductsResponse, string>({
      query: () => "/latest",
    }),
  }),
});

export const { useLatestProductsQuery } = productApi;

/*
  # For queries, you usually destructure the result like this:
      const { data, isLoading } = useGetSomeDataQuery();

  # For mutations, the hook returns an array where the first element is the trigger function and the second element is an object containing the mutation state. Therefore, you should use array destructuring.
      const [triggerFunction, { data, isLoading }] = useMutation();

*/
