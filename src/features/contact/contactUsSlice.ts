import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosInstance1 } from "../../api/AxiosInstance";

interface ContactForm {
  fullName: string;
  email: string;
  mobileNumber: string;
  subject: string;
  message: string;
}

interface ContactState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ContactState = {
  loading: false,
  success: false,
  error: null,
};

// ✅ Async thunk for submitting contact form
export const submitContactForm = createAsyncThunk(
  "contact/submit",
  async (formData: ContactForm, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance1.post("/contact/add", formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearContactStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(
        submitContactForm.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      );
  },
});

export const { clearContactStatus } = contactSlice.actions;
export default contactSlice.reducer;
