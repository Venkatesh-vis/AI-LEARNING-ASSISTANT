import { createSlice } from "@reduxjs/toolkit";
import { getDashboard } from "./dashboardThunk";
import type { DashboardState } from "./dashboardTypes";
import { deleteDocumentById, uploadDocument } from "../documents/documentThunk";
import { addUploadedDocumentToDashboard, removeDocumentFromDashboard } from "./dashboardHelpers";


const initialState: DashboardState = {
  dashboard: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        getDashboard.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getDashboard.fulfilled,
        (state, action) => {
          state.loading = false;
          state.dashboard = action.payload;
        }
      )

      .addCase(
        getDashboard.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload ?? "Failed to fetch dashboard data";
        }
      )

      //updating count and activity on successful file upload
      .addCase(
        uploadDocument.fulfilled,
        (state, action) => {
          addUploadedDocumentToDashboard(state, action.payload);
        }
      )

      //updating count on successfull delete
      .addCase(
        deleteDocumentById.fulfilled,
        (state, action) => {
          removeDocumentFromDashboard(
            state,
            action.payload
          );
        }
      )
  },
});

export default dashboardSlice.reducer;