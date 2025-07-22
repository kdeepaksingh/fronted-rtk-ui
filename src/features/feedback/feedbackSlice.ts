import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosInstance1 } from "../../api/AxiosInstance";

interface Feedback {
  _id?: string;
  fullName: string;
  email: string;
  feedbackCategory: string;
  mobileNumber: string;
  comments: string;
  [key: string]: any;
}

interface FeedbackState {
  feedbacks: Feedback[];
  selectedFeedback: Feedback | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: FeedbackState = {
  feedbacks: [],
  selectedFeedback: null,
  loading: false,
  error: null,
  success: false,
};

// ✅ Get All Feedbacks
export const fetchFeedbacks = createAsyncThunk(
  "feedback/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await AxiosInstance1.get("/feedback/list");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch feedbacks"
      );
    }
  }
);

// ✅ Get Feedback by ID
export const fetchFeedbackById = createAsyncThunk(
  "feedback/fetchById",
  async (id: string, thunkAPI) => {
    try {
      const response = await AxiosInstance1.get(`/feedback/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch feedback"
      );
    }
  }
);

// ✅ Create Feedback
export const createFeedback = createAsyncThunk(
  "feedback/createFeedback",
  async (feedback: Feedback, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance1.post("/feedback/add", feedback);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Update Feedback
export const updateFeedback = createAsyncThunk(
  "feedback/update",
  async ({ id, data }: { id: string; data: Feedback }, thunkAPI) => {
    try {
      const response = await AxiosInstance1.put(`/feedback/update/${id}`, data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update feedback"
      );
    }
  }
);

// ✅ Delete Feedback
export const deleteFeedback = createAsyncThunk(
  "feedback/delete",
  async (id: string, thunkAPI) => {
    try {
      await AxiosInstance1.delete(`/feedback/delete/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete feedback"
      );
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    clearFeedbackState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFeedbacks.fulfilled,
        (state, action: PayloadAction<Feedback[]>) => {
          state.loading = false;
          state.feedbacks = action.payload;
        }
      )
      .addCase(fetchFeedbacks.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By ID
      .addCase(fetchFeedbackById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedFeedback = null;
      })
      .addCase(
        fetchFeedbackById.fulfilled,
        (state, action: PayloadAction<Feedback>) => {
          state.loading = false;
          state.selectedFeedback = action.payload;
        }
      )
      .addCase(
        fetchFeedbackById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // Create
      .addCase(createFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        createFeedback.fulfilled,
        (state, action: PayloadAction<Feedback>) => {
          state.loading = false;
          state.feedbacks.unshift(action.payload);
          state.success = true;
        }
      )
      .addCase(createFeedback.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateFeedback.fulfilled,
        (state, action: PayloadAction<Feedback>) => {
          state.loading = false;
          state.feedbacks = state.feedbacks.map((fb) =>
            fb._id === action.payload._id ? action.payload : fb
          );
          state.success = true;
        }
      )
      .addCase(updateFeedback.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteFeedback.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.feedbacks = state.feedbacks.filter(
            (fb) => fb._id !== action.payload
          );
          state.success = true;
        }
      )
      .addCase(deleteFeedback.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFeedbackState } = feedbackSlice.actions;

export default feedbackSlice.reducer;
