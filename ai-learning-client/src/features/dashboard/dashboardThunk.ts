import { createAsyncThunk } from "@reduxjs/toolkit";
import type { DashboardData } from "./dashboardType";
import { getDashboardState } from "./dashboardService";


export const getDashboard =
  createAsyncThunk<
    DashboardData,
    void,
    { rejectValue: string }
  >(
    "dashboard/getDashboard",
    async (_, thunkAPI) => {
      try {
        return await getDashboardState();
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch dashboard data"
        );
      }
    }
  );