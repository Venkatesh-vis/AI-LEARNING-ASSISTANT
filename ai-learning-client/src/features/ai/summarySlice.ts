import { createSlice } from "@reduxjs/toolkit";
import { generateSummary, explainConcept, } from "./aiThunk";
import type { SummaryState, } from "./aiTypes";

const initialState: SummaryState = {
  summary: null,
  conceptExplanation: null,
   concepts: {},
  generateSummaryLoading: false,
  explainConceptLoading: false,
  error: null,
};

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    clearSummary: (state) => {
      state.summary = null;
    },

    clearConceptExplanation: (state) => {
      state.conceptExplanation = null;
    },

    clearSummaryState: (state) => {
      state.summary = null;
      state.conceptExplanation = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* =========================
         GENERATE SUMMARY
      ========================= */

      .addCase(
        generateSummary.pending,
        (state) => {
          state.generateSummaryLoading = true;
          state.error = null;
        }
      )

      .addCase(
        generateSummary.fulfilled,
        (state, action) => {
          state.generateSummaryLoading = false;
          state.summary = action.payload;
        }
      )

      .addCase(
        generateSummary.rejected,
        (state, action) => {
          state.generateSummaryLoading = false;
          state.error = action.payload ?? "Failed to generate summary";
        }
      )

      /* =========================
         EXPLAIN CONCEPT
      ========================= */

      .addCase(
        explainConcept.pending,
        (state) => {
          state.explainConceptLoading = true;
          state.error = null;
        }
      )

      .addCase(
        explainConcept.fulfilled,
        (state, action) => {
          state.explainConceptLoading = false;
          state.concepts[action.payload.concept.toLowerCase()] = action.payload;
        }
      )

      .addCase(
        explainConcept.rejected,
        (state, action) => {
          state.explainConceptLoading = false;
          state.error = action.payload ?? "Failed to explain concept";
        }
      );
  },
});

export const { clearSummary, clearConceptExplanation, clearSummaryState, } = summarySlice.actions;

export default summarySlice.reducer;