import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosInstance1 } from "../../api/AxiosInstance";

// Types
export interface Attendance {
  _id?: string;
  employeeId: string;
  employeeName: string;
  date: string;
  inTime?: string;
  outTime?: string;
  status: "present" | "absent" | "leave";
  attendanceType: string;
  remarks?: string;
}

interface AttendanceState {
  list: Attendance[];
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  list: [],
  loading: false,
  error: null,
};

// Async Thunks
export const markAttendance = createAsyncThunk<
  Attendance,
  Attendance,
  { rejectValue: string }
>("attendance/mark", async (payload, { rejectWithValue }) => {
  try {
    const res = await AxiosInstance1.post("/attendance/add", payload);
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || "Failed to mark attendance."
    );
  }
});

export const fetchAllAttendance = createAsyncThunk<
  Attendance[],
  void,
  { rejectValue: string }
>("attendance/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await AxiosInstance1.get("/attendance/list");
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || "Failed to fetch attendance."
    );
  }
});

export const fetchAttendanceByUser = createAsyncThunk<
  Attendance[],
  string,
  { rejectValue: string }
>("attendance/fetchByUser", async (userId, { rejectWithValue }) => {
  try {
    const res = await AxiosInstance1.get(`/attendance/list/${userId}`);
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || "Failed to fetch user's attendance."
    );
  }
});

export const updateAttendance = createAsyncThunk<
  Attendance,
  { id: string; changes: Partial<Attendance> },
  { rejectValue: string }
>("attendance/update", async ({ id, changes }, { rejectWithValue }) => {
  try {
    const res = await AxiosInstance1.put(`/attendance/update/${id}`, changes);
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || "Failed to update attendance."
    );
  }
});

// Slice
const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clearAttendanceError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Mark Attendance
      .addCase(markAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        markAttendance.fulfilled,
        (state, action: PayloadAction<Attendance>) => {
          state.loading = false;
          state.list.push(action.payload);
        }
      )
      .addCase(markAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to mark attendance.";
      })

      // Fetch All
      .addCase(fetchAllAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllAttendance.fulfilled,
        (state, action: PayloadAction<Attendance[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchAllAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch attendance list.";
      })

      // Fetch by User
      .addCase(fetchAttendanceByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAttendanceByUser.fulfilled,
        (state, action: PayloadAction<Attendance[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchAttendanceByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user attendance.";
      })

      // Update Attendance
      .addCase(updateAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateAttendance.fulfilled,
        (state, action: PayloadAction<Attendance>) => {
          state.loading = false;
          const index = state.list.findIndex(
            (item) => item._id === action.payload._id
          );
          if (index !== -1) state.list[index] = action.payload;
        }
      )
      .addCase(updateAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update attendance.";
      });
  },
});

export const { clearAttendanceError } = attendanceSlice.actions;
export default attendanceSlice.reducer;
