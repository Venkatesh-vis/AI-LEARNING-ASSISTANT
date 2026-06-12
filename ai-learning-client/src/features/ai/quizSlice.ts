import { createSlice } from "@reduxjs/toolkit";
import { generateQuiz } from "./aiThunk";
import type {QuizState,} from "./aiTypes";

const initialState: QuizState = {
  quiz: null,
  generateQuizLoading: false,
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    clearQuiz: (state) => {
      state.quiz = null;
    },

    clearQuizState: (state) => {
      state.quiz = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* =========================
         GENERATE QUIZ
      ========================= */

      .addCase(
        generateQuiz.pending,
        (state) => {
          state.generateQuizLoading = true;
          state.error = null;
        }
      )

      .addCase(
        generateQuiz.fulfilled,
        (state, action) => {
          state.generateQuizLoading = false;
          state.quiz = action.payload;
        }
      )

      .addCase(
        generateQuiz.rejected,
        (state, action) => {
          state.generateQuizLoading = false;
          state.error = action.payload ?? "Failed to generate quiz";
        }
      );
  },
});

export const {clearQuiz,clearQuizState,} = quizSlice.actions;

export default quizSlice.reducer;