/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosInstance1 } from "../../api/AxiosInstance";

// Types
export interface Leave {
  _id?: string;
  employeeId: string;
  leaveType: string;
  dayType: string;
  fromDate: string;
  toDate: string;
  reason: string;
  includeWeekend: boolean;
  applyingTo: string;
  ccEmails?: string[];
  attachment?: string;
  status?: "pending" | "Approved" | "Rejected" | "Cancelled";
  createdAt?: string;
}

interface LeaveState {
  leaves: Leave[];
  selectedLeave: Leave | null;
  loading: boolean;
  error: string | null;
  summary: any; // 👈 add this
}

const initialState: LeaveState = {
  leaves: [],
  selectedLeave: null,
  loading: false,
  error: null,
  summary: null, // 👈
};

// Create Leave
export const applyLeave = createAsyncThunk<
  Leave,
  FormData,
  { rejectValue: string }
>("leaves/apply", async (formData, { rejectWithValue }) => {
  try {
    const res = await AxiosInstance1.post("/leave/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Fetch All Leaves
export const fetchLeaves = createAsyncThunk<Leave[]>(
  "leaves/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance1.get("/leaves/list");
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Leave summary

export const getLeavesSummary = createAsyncThunk<any>(
  "leaves/Summary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance1.get("/leave/summary");
      return res.data; // full summary object
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch Leaves by Employee ID
export const fetchLeavesByEmployee = createAsyncThunk<
  Leave[],
  string,
  { rejectValue: string }
>("leaves/fetchByEmployee", async (employeeId, { rejectWithValue }) => {
  try {
    const res = await AxiosInstance1.get(`/leave/list/${employeeId}`);
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Update Leave Status
export const updateLeaveStatus = createAsyncThunk<
  Leave,
  { id: string; status: "Approved" | "Rejected" },
  { rejectValue: string }
>("leaves/updateStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const res = await AxiosInstance1.put(
      `/leave/update/${id}/${status.toLowerCase()}`,
      {
        status: status.toLowerCase(),
      }
    );
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Cancel Leave
export const cancelLeave = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("leaves/cancel", async (id, { rejectWithValue }) => {
  try {
    await AxiosInstance1.delete(`/leave/delete/${id}`);
    return id;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Slice
const leaveSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {
    clearSelectedLeave(state) {
      state.selectedLeave = null;
      state.error = null;
    },
    clearLeaveError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Apply Leave
      .addCase(applyLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyLeave.fulfilled, (state, action: PayloadAction<Leave>) => {
        state.loading = false;
        state.leaves.push(action.payload);
      })
      .addCase(applyLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch All
      .addCase(fetchLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchLeaves.fulfilled,
        (state, action: PayloadAction<Leave[]>) => {
          state.loading = false;
          state.leaves = action.payload;
        }
      )
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getLeavesSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getLeavesSummary.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.summary = action.payload; // ✅ correct place to store summary
        }
      )
      .addCase(getLeavesSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch by Employee ID
      .addCase(fetchLeavesByEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchLeavesByEmployee.fulfilled,
        (state, action: PayloadAction<Leave[]>) => {
          state.loading = false;
          state.leaves = action.payload;
        }
      )
      .addCase(fetchLeavesByEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Status
      .addCase(
        updateLeaveStatus.fulfilled,
        (state, action: PayloadAction<Leave>) => {
          const index = state.leaves.findIndex(
            (l) => l._id === action.payload._id
          );
          if (index !== -1) {
            state.leaves[index] = action.payload;
          }
        }
      )

      // Cancel Leave
      .addCase(
        cancelLeave.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.leaves = state.leaves.filter((l) => l._id !== action.payload);
        }
      )
      .addCase(cancelLeave.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedLeave, clearLeaveError } = leaveSlice.actions;
export default leaveSlice.reducer;
