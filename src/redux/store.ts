import {configureStore} from "@reduxjs/toolkit";
import {excusesApi} from "./excuse-api-slice";
import {categoryApi} from "./category-api-slice";

export const store = configureStore({
  reducer: {
    [excusesApi.reducerPath]: excusesApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(excusesApi.middleware, categoryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
