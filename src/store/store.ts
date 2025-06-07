import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alertSlice/alertSlice";
import globalReducer from "../features/alertSlice/globalSlice";
import newsReducer from "../features/news/newsSlice";
import loadingReducer from "../features/alertSlice/loadingSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    loading: loadingReducer,
    global: globalReducer,
    news: newsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
