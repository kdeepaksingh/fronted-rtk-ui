import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SnackMessage {
  dataKey: string;
  params?: Record<string, unknown>;
}

interface LoadingParams {
  key?: string;
  isLoading?: boolean;
  message: SnackMessage;
  snack?: boolean;
}

interface LoadingState {
  [key: string]: LoadingParams;
}

const initialState: LoadingState = {};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(
      state,
      action: PayloadAction<{ id: string; params: LoadingParams }>
    ) {
      const { id, params } = action.payload;
      state[id] = params;
    },
    clearLoading(state, action: PayloadAction<string>) {
      delete state[action.payload];
    },
  },
});

export const { setLoading, clearLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
export type { LoadingParams, SnackMessage };
