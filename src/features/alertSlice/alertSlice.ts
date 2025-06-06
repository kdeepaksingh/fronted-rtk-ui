import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  message: string;
  success: boolean;
  error: boolean;
}

const initialState: AlertState = {
  message: "",
  success: false,
  error: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showSuccess: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.success = true;
      state.error = false;
    },
    showError: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.error = true;
      state.success = false;
    },
    clearAlert: (state) => {
      state.message = "";
      state.success = false;
      state.error = false;
    },
  },
});

export const { showSuccess, showError, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
