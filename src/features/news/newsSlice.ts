// store/slices/newsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../api/AxiosInstance";

interface NewsItem {
  id: string | number;
  date: string;
  news_headline: string;
  short_description: string;
  link: string;
  state?: string;
  district?: string;
  category?: string;
  crop?: string;
}

interface NewsState {
  token: string;
  events: NewsItem[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  token: "",
  events: [],
  loading: false,
  error: null,
};

export const fetchNewsToken = createAsyncThunk("news/fetchToken", async () => {
  const response = await AxiosInstance.get("/api/news/token");
  return response.data.data.token;
});

export const fetchNewsEvents = createAsyncThunk(
  "news/fetchEvents",
  async ({
    from_date,
    to_date,
    token,
  }: {
    from_date: string;
    to_date: string;
    token: string;
  }) => {
    const response = await AxiosInstance.post("/api/news/events", {
      from_date,
      to_date,
      token,
    });
    return response.data.data.events;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchNewsToken.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.token = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchNewsEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchNewsEvents.fulfilled,
        (state, action: PayloadAction<NewsItem[]>) => {
          state.events = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchNewsEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news";
      });
  },
});

export const selectNewsToken = (state: { news: NewsState }) => state.news.token;
export const selectNewsEvents = (state: { news: NewsState }) =>
  state.news.events;

export default newsSlice.reducer;
