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
  mobileOTP: string;
  emailOTP: string;
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

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

interface AuthState {
  status: "idle" | "loading" | "succeeded" | "failed";
  data: User | null;
  error: string | null;
  message?: string; // optional if you want to show messages like reset success
}

// ---------------------
// Initial State
// ---------------------
const initialState: AuthState = {
  data: null,
  status: "idle",
  error: null,
};

interface ResetResponse {
  message: string;
}

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

// export const registerUser = createAsyncThunk<
//   User,
//   RegisterPayload,
//   { rejectValue: string }
// >("auth/registerUser", async (payload, { rejectWithValue }) => {
//   try {
//     const encryptedPayload = {
//       ...payload,
//       email: Encryption.encode(payload.email),
//       password: Encryption.encode(payload.password),
//     };

//     const response = await AxiosInstance.post("/register", encryptedPayload);
//     return response.data;
//   } catch (err: any) {
//     return rejectWithValue(err.response?.data?.message || err.message);
//   }
// });

// export const loginUser = createAsyncThunk<
//   User,
//   LoginPayload,
//   { rejectValue: string }
// >("auth/loginUser", async (payload, { rejectWithValue }) => {
//   try {
//     const encryptedPayload = {
//       ...payload,
//       emailOrMobile: Encryption.encode(payload.emailOrMobile),
//       password: Encryption.encode(payload.password),
//       verificationCode: Encryption.encode(payload.verificationCode),
//     };

//     const response = await AxiosInstance.post("/login", encryptedPayload);
//     return response.data;
//   } catch (err: any) {
//     return rejectWithValue(err.response?.data?.message || err.message);
//   }
// });

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

export const verifyEmailOTP = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>("auth/verifyEmailOTP", async (payload, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance.post("/verify-email-otp", payload);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const verifyMobileOTP = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>("auth/verifyMobileOTP", async (payload, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance.post("/verify-mobile-otp", payload);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const resetPassword = createAsyncThunk<
  ResetResponse,
  ResetPasswordPayload,
  { rejectValue: string }
>("auth/resetPassword", async (payload, { rejectWithValue }) => {
  try {
    const { token, newPassword } = payload;
    const response = await AxiosInstance.post(`/reset-password/${token}`, {
      newPassword, // Only send password in body
    });
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
      .addCase(verifyEmailOTP.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        verifyEmailOTP.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(verifyEmailOTP.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      })
      .addCase(verifyMobileOTP.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        verifyMobileOTP.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(verifyMobileOTP.rejected, (state, action) => {
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
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        resetPassword.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.status = "succeeded";
          state.message = action.payload.message;
        }
      )
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export default authSlice.reducer;
