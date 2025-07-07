/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../api/AxiosInstance";

// ---------------------
// Types
// ---------------------
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  mobileNo: string;
  verificationCode: string;
  // Add more fields if needed
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
  loginType: string;
  emailOrMobile: string;
  verificationCode: string;
}

interface ForgotPayload {
  email: string;
}

interface AuthState {
  data: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// ---------------------
// Initial State
// ---------------------
const initialState: AuthState = {
  data: null,
  status: "idle",
  error: null,
};

// ---------------------
// Async Thunk
// ---------------------
export const registerUser = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>("auth/registerUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance.post("/register", payload);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const loginUser = createAsyncThunk<
  User,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance.post("/login", payload);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const forgotPassword = createAsyncThunk<
  User,
  ForgotPayload,
  { rejectValue: string }
>("auth/forgotPassword", async (payload, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance.post("/forgot-password", payload);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ---------------------
// Slice
// ---------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        forgotPassword.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export default authSlice.reducer;
