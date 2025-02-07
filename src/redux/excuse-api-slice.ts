import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Excuse} from "../models/excuse";

export const excusesApi = createApi({
  reducerPath: "excusesApi",
  baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_BASE_URL}),
  tagTypes: ["Excuses"],
  endpoints: (builder) => ({
    getExcuses: builder.query<Excuse[], void>({
      query: () => "excuses",
      providesTags: ["Excuses"],
    }),
    getExcuseById: builder.query<Excuse, number>({
      query: (id) => `excuses/${id}`,
      providesTags: (_, __, id) => [{type: "Excuses", id}],
    }),
    addExcuse: builder.mutation<Excuse, Partial<Excuse>>({
      query: (newExcuse) => ({
        url: "excuses",
        method: "POST",
        body: newExcuse,
      }),
      invalidatesTags: ["Excuses"],
    }),
    updateExcuse: builder.mutation<Excuse, { id: number; updatedExcuse: Partial<Excuse> }>({
      query: ({id, updatedExcuse}) => ({
        url: `excuses/${id}`,
        method: "PUT",
        body: updatedExcuse,
      }),
      invalidatesTags: ["Excuses"],
    }),
    deleteExcuse: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `excuses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Excuses"],
    }),
  }),
});

export const {
  useGetExcusesQuery,
  useGetExcuseByIdQuery,
  useAddExcuseMutation,
  useUpdateExcuseMutation,
  useDeleteExcuseMutation,
} = excusesApi;
