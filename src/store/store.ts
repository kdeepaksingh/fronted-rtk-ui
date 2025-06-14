import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alertSlice/alertSlice";
import globalReducer from "../features/alertSlice/globalSlice";
import newsReducer from "../features/news/newsSlice";
import searchReducer from "../features/table/searchSlice";
import loadingReducer from "../features/alertSlice/loadingSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    loading: loadingReducer,
    global: globalReducer,
    news: newsReducer,
    search: searchReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
