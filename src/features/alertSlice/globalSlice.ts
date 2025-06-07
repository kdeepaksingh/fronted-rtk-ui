import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  iframeZoomLevel: number;
}

const initialState: GlobalState = {
  iframeZoomLevel: 1,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIframeZoomLevel: (state, action: PayloadAction<number>) => {
      state.iframeZoomLevel = action.payload;
    },
    resetGlobalState: () => initialState,
  },
});

export const { setIframeZoomLevel, resetGlobalState } = globalSlice.actions;
export default globalSlice.reducer;
