import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alertSlice/alertSlice";
import loadingReducer from "../features/alertSlice/loadingSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    loading: loadingReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
