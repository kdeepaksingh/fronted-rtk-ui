import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SearchColumn {
  field: string;
  headerName?: string;
}

interface SearchState {
  searchText: string;
  searchColumns: string[];
  searchableColumns: SearchColumn[];
}

const initialState: SearchState = {
  searchText: "",
  searchColumns: [],
  searchableColumns: [], // populate externally
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setSearchColumns(state, action: PayloadAction<string[]>) {
      state.searchColumns = action.payload;
    },
    setAllSearchColumns(state) {
      state.searchColumns = state.searchableColumns.map((col) => col.field);
    },
    setSearchableColumns(state, action: PayloadAction<SearchColumn[]>) {
      state.searchableColumns = action.payload;
    },
  },
});

export const {
  setSearchText,
  setSearchColumns,
  setAllSearchColumns,
  setSearchableColumns,
} = searchSlice.actions;

export default searchSlice.reducer;
