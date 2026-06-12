import { createSlice } from "@reduxjs/toolkit";
import { generateFlashcards } from "./aiThunk";
import type {FlashcardState,} from "./aiTypes";

const initialState: FlashcardState = {
  flashcards: null,
  generateFlashcardsLoading: false,
  error: null,
};

const flashcardSlice = createSlice({
  name: "flashcards",
  initialState,
  reducers: {
    clearFlashcards: (state) => {
      state.flashcards = null;
    },
    clearFlashcardState: (state) => {
      state.flashcards = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* =========================
         GENERATE FLASHCARDS
      ========================= */

      .addCase(
        generateFlashcards.pending,
        (state) => {
          state.generateFlashcardsLoading = true;
          state.error = null;
        }
      )

      .addCase(
        generateFlashcards.fulfilled,
        (state, action) => {
          state.generateFlashcardsLoading = false;
          state.flashcards = action.payload;
        }
      )

      .addCase(
        generateFlashcards.rejected,
        (state, action) => {
          state.generateFlashcardsLoading = false;
          state.error = action.payload ?? "Failed to generate flashcards";
        }
      );
  },
});

export const {clearFlashcards,clearFlashcardState,} = flashcardSlice.actions;

export default flashcardSlice.reducer;