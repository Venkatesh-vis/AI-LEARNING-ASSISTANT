import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getDashboard } from "./dashboardThunk";
import type { DashboardData, DashboardState } from "./dashboardTypes";

const initialState: DashboardState = {
  dashboard: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  reducers: {
    setDashboard: (state, action: PayloadAction<DashboardData>) => {
      state.dashboard = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })

      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch dashboard data";
      });
  },
});

export const { setDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;