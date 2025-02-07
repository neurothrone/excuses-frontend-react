import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_BASE_URL}),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<string[], void>({
      query: () => "excuses/categories",
      providesTags: ["Category"],
    }),
  }),
});

export const {useGetCategoriesQuery} = categoryApi;
