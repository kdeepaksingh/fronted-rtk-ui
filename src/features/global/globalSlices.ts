import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Storage from "../../utils/Storage";

interface GlobalState {
  defaultFontSize: number;
  fontSize: number;
}

const defaultFontSize = 16;
const initialFontSize = Storage.getData("fontSize", defaultFontSize);

const initialState: GlobalState = {
  defaultFontSize,
  fontSize: initialFontSize,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
      Storage.setData("fontSize", action.payload);
    },
    resetFontSize: (state) => {
      state.fontSize = defaultFontSize;
      Storage.removeData("fontSize");
    },
    increaseFontSize: (state) => {
      state.fontSize = Math.min(state.fontSize + 1, 19);
      Storage.setData("fontSize", state.fontSize);
    },
    decreaseFontSize: (state) => {
      state.fontSize = Math.max(state.fontSize - 1, 13);
      Storage.setData("fontSize", state.fontSize);
    },
  },
});

export const {
  setFontSize,
  resetFontSize,
  increaseFontSize,
  decreaseFontSize,
} = globalSlice.actions;

export const selectFontSize = (state: { global: GlobalState }) =>
  state.global.fontSize;

export const selectIframeZoomLevel = (state: { global: GlobalState }) => {
  const step = 0.05;
  return 1 + (state.global.fontSize - state.global.defaultFontSize) * step;
};

export default globalSlice.reducer;
