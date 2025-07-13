/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosInstance1 } from "../../api/AxiosInstance";

export interface Employee {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  department: string;
  designation: string;
  joiningDate: string;
  employeeId: string;
  address: string;
  profilePhotoUrl?: string;
  resumeUrl?: string;
}

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
};

// Fetch all employees with optional filters and search
export const fetchEmployees = createAsyncThunk<
  Employee[],
  { search?: string; department?: string; designation?: string } | undefined
>("employees/fetchAll", async (filters, { rejectWithValue }) => {
  try {
    const params = filters ? filters : {};
    const response = await AxiosInstance1.get<Employee[]>("/employees/list", {
      params,
    });
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Fetch one employee by ID
export const fetchEmployeeById = createAsyncThunk<
  Employee,
  string,
  { rejectValue: string }
>("employees/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance1.get<Employee>(`/employees/${id}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Create new employee
export const createEmployee = createAsyncThunk<
  Employee,
  FormData,
  { rejectValue: string }
>("employees/create", async (formData, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance1.post<Employee>(
      "/employees/add",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Update employee by ID
export const updateEmployee = createAsyncThunk<
  Employee,
  { id: string; formData: FormData },
  { rejectValue: string }
>("employees/update", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance1.put<Employee>(
      `/employees/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Delete employee by ID
export const deleteEmployee = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("employees/delete", async (id, { rejectWithValue }) => {
  try {
    await AxiosInstance1.delete(`/employees/${id}`);
    return id;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearSelectedEmployee(state) {
      state.selectedEmployee = null;
      state.error = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchEmployees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployees.fulfilled,
        (state, action: PayloadAction<Employee[]>) => {
          state.loading = false;
          state.employees = action.payload;
        }
      )
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchEmployeeById
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployeeById.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.loading = false;
          state.selectedEmployee = action.payload;
        }
      )
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // createEmployee
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.loading = false;
          state.employees.push(action.payload);
        }
      )
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // updateEmployee
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.loading = false;
          state.employees = state.employees.map((emp) =>
            emp._id === action.payload._id ? action.payload : emp
          );
          if (
            state.selectedEmployee &&
            state.selectedEmployee._id === action.payload._id
          ) {
            state.selectedEmployee = action.payload;
          }
        }
      )
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // deleteEmployee
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteEmployee.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.employees = state.employees.filter(
            (emp) => emp._id !== action.payload
          );
          if (
            state.selectedEmployee &&
            state.selectedEmployee._id === action.payload
          ) {
            state.selectedEmployee = null;
          }
        }
      )
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedEmployee, clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
