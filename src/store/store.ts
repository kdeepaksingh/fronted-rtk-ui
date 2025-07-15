import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alertSlice/alertSlice";
import globalReducer from "../features/alertSlice/globalSlice";
import newsReducer from "../features/news/newsSlice";
import searchReducer from "../features/table/searchSlice";
import loadingReducer from "../features/alertSlice/loadingSlice";
import employeeReducer from "../features/employee/employeeSlice";
import leaveReducer from "../features/leave/leaveSlice";
import attendanceReducer from "../features/attendence/attendanceSlice";

// Create Redux store
export const store = configureStore({
  reducer: {
    alert: alertReducer,
    loading: loadingReducer,
    global: globalReducer,
    news: newsReducer,
    search: searchReducer,
    auth: authReducer,
    employees: employeeReducer,
    leaves: leaveReducer,
    attendance: attendanceReducer,
  },
});

// ✅ Typed state and dispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Custom typed dispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
