import { createSlice } from "@reduxjs/toolkit";
import type { QuizState } from "./quizTypes";
import { deleteQuiz, generateQuiz, getQuiz, getQuizResults, getQuizzes, submitQuiz } from "./quizThunk";


const initialState: QuizState = {
    quiz: null,
    quizzes: [],
    quizResult: null,
    quizResults: null,
    generateQuizLoading: false,
    getQuizzesLoading: false,
    getQuizLoading: false,
    submitQuizLoading: false,
    getQuizResultsLoading: false,
    deleteQuizLoading: false,
    error: null,
};

const quizSlice = createSlice({
    name: "quiz",

    initialState,

    reducers: {
        clearQuiz(state) {
            state.quiz = null;
        },

        clearQuizResult(state) {
            state.quizResult = null;
        },

        clearQuizResults(state) {
            state.quizResults = null;
        },
    },

    extraReducers: (builder) => {
        builder

            /* GET QUIZZES */

            .addCase(
                getQuizzes.pending,
                (state) => {
                    state.getQuizzesLoading =
                        true;

                    state.error = null;
                }
            )

            .addCase(
                getQuizzes.fulfilled,
                (state, action) => {
                    state.getQuizzesLoading =
                        false;

                    state.quizzes =
                        action.payload;
                }
            )

            .addCase(
                getQuizzes.rejected,
                (state, action) => {
                    state.getQuizzesLoading =
                        false;

                    state.error =
                        action.payload ??
                        "Failed to fetch quizzes";
                }
            )

            /* GENERATE */

            .addCase(
                generateQuiz.pending,
                (state) => {
                    state.generateQuizLoading =
                        true;

                    state.error = null;
                }
            )

            .addCase(
                generateQuiz.fulfilled,
                (state, action) => {
                    state.generateQuizLoading =
                        false;

                    state.quiz =
                        action.payload;

                    state.quizzes.unshift(
                        action.payload
                    );
                }
            )

            .addCase(
                generateQuiz.rejected,
                (state, action) => {
                    state.generateQuizLoading =
                        false;

                    state.error =
                        action.payload ??
                        "Failed to generate quiz";
                }
            )


            /* SUBMIT */

            .addCase(
                submitQuiz.pending,
                (state) => {
                    state.submitQuizLoading = true;
                    state.error = null;
                }
            )

            .addCase(
                submitQuiz.fulfilled,
                (state, action) => {
                    state.submitQuizLoading = false;

                    state.quizResult = action.payload;

                    if (
                        state.quiz &&
                        state.quiz._id === action.payload.quizId
                    ) {
                        state.quiz.score = action.payload.score;

                        state.quiz.userAnswers =
                            action.payload.userAnswers.map(
                                (answer) => answer.selectedAnswer
                            );

                        state.quiz.completedAt =
                            action.payload.userAnswers[action.payload.userAnswers.length - 1]?.answeredAt ?? null;
                    }

                    state.quizzes =
                        state.quizzes.map((quiz) =>
                            quiz._id === action.payload.quizId
                                ? {
                                    ...quiz,
                                    score: action.payload.score,
                                    userAnswers:
                                        action.payload.userAnswers.map(
                                            (answer) =>
                                                answer.selectedAnswer
                                        ),
                                    completedAt:
                                        action.payload.userAnswers[
                                            action.payload.userAnswers.length -
                                            1
                                        ]?.answeredAt ?? null,
                                }
                                : quiz
                        );
                }
            )

            .addCase(
                submitQuiz.rejected,
                (state, action) => {
                    state.submitQuizLoading = false;
                    state.error = action.payload ?? "Failed to submit quiz";
                }
            )

            /* GET QUIZ RESULTS */

            .addCase(
                getQuizResults.pending,
                (state) => {
                    state.getQuizResultsLoading = true;
                    state.error = null;
                }
            )

            .addCase(
                getQuizResults.fulfilled,
                (state, action) => {
                    state.getQuizResultsLoading = false;
                    state.quizResults = action.payload;
                }
            )

            .addCase(
                getQuizResults.rejected,
                (state, action) => {
                    state.getQuizResultsLoading = false;
                    state.error = action.payload ?? "Failed to fetch quiz results";
                }
            )


            .addCase(
                getQuiz.pending,
                (state) => {
                    state.getQuizLoading = true;
                    state.error = null;
                }
            )

            .addCase(
                getQuiz.fulfilled,
                (state, action) => {
                    state.getQuizLoading = false;
                    state.quiz = action.payload;
                }
            )

            .addCase(
                getQuiz.rejected,
                (state, action) => {
                    state.getQuizLoading = false;
                    state.error = action.payload ?? "Failed to fetch quiz";
                }
            )

            /* DELETE QUIZ */

            .addCase(
                deleteQuiz.pending,
                (state) => {
                    state.deleteQuizLoading = true;
                }
            )

            .addCase(
                deleteQuiz.fulfilled,
                (state, action) => {
                    state.deleteQuizLoading = false;

                    state.quizzes =
                        state.quizzes.filter(
                            (quiz) =>
                                quiz._id !==
                                action.payload
                        );
                }
            )

            .addCase(
                deleteQuiz.rejected,
                (state, action) => {
                    state.deleteQuizLoading = false;

                    state.error =
                        action.payload ??
                        "Failed to delete quiz";
                }
            )
    },
});

export const {clearQuiz, clearQuizResult, clearQuizResults} = quizSlice.actions;

export default quizSlice.reducer;