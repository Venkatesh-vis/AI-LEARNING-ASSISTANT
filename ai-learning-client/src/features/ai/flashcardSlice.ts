import { createSlice } from "@reduxjs/toolkit";
import { deleteFlashcards, generateFlashcards, getFlashcardSets, reviewFlashcard, toggleFlashcardStar, } from "./aiThunk";
import type { FlashcardState, } from "./aiTypes";

const initialState: FlashcardState = {
  flashcardSets: [],
  getFlashcardSetsLoading: false,
  getFlashcardSetLoading: false,
  generateFlashcardsLoading: false,
  reviewFlashcardLoading: false,
  toggleStarLoading: false,
  deleteFlashcardsLoading: false,
  error: null,
};

const flashcardSlice =
  createSlice({
    name: "flashcards",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
      builder

        /* GET SETS */

        .addCase(
          getFlashcardSets.pending,
          (state) => {
            state.getFlashcardSetsLoading = true;
            state.error = null;
          }
        )

        .addCase(
          getFlashcardSets.fulfilled,
          (state, action) => {
            state.getFlashcardSetsLoading = false;
            state.flashcardSets = action.payload;
          }
        )

        .addCase(
          getFlashcardSets.rejected,
          (state, action) => {
            state.getFlashcardSetsLoading = false;
            state.error = action.payload ?? "Failed to fetch flashcard sets";
          }
        )


        /* GENERATE */

        .addCase(
          generateFlashcards.pending,
          (state) => {
            state.generateFlashcardsLoading = true;
            state.error = null;
          }
        )

        .addCase(
          generateFlashcards.fulfilled,
          (state) => {
            state.generateFlashcardsLoading = false;
          }
        )

        .addCase(
          generateFlashcards.rejected,
          (state, action) => {
            state.generateFlashcardsLoading = false;
            state.error = action.payload ?? "Failed to generate flashcards";
          }
        )

        /* REVIEW */

        .addCase(
          reviewFlashcard.pending,
          (state) => {
            state.reviewFlashcardLoading = true;
          }
        )

        .addCase(
          reviewFlashcard.fulfilled,
          (state,) => {
            state.reviewFlashcardLoading = false;
          }
        )

        .addCase(
          reviewFlashcard.rejected,
          (state, action) => {
            state.reviewFlashcardLoading = false;
            state.error = action.payload ?? "Failed to review flashcard";
          }
        )

        /* STAR */

        .addCase(
          toggleFlashcardStar.pending,
          (state) => {
            state.toggleStarLoading = true;
          }
        )

        .addCase(
          toggleFlashcardStar.fulfilled,
          (state) => {
            state.toggleStarLoading = false;
          }
        )

        .addCase(
          toggleFlashcardStar.rejected,
          (state, action) => {
            state.toggleStarLoading = false;
            state.error = action.payload ?? "Failed to update flashcard";
          }
        )

        /* DELETE */

        .addCase(
          deleteFlashcards.pending,
          (state) => {
            state.deleteFlashcardsLoading = true;
          }
        )

        .addCase(
          deleteFlashcards.fulfilled,
          (state, action) => {
            state.deleteFlashcardsLoading = false;
            state.flashcardSets = state.flashcardSets.filter((set) => set._id !== action.payload
            );
          }
        )

        .addCase(
          deleteFlashcards.rejected,
          (state, action) => {
            state.deleteFlashcardsLoading = false;
            state.error = action.payload ?? "Failed to delete flashcards";
          }
        );
    },
  });


export default flashcardSlice.reducer;