import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GenerateQuizRequest, Quiz, QuizResult, QuizResultsResponse, SubmitQuizRequest } from "./quizTypes";
import { generateQuizState, getQuizResultsState, getQuizzesState, submitQuizState, getQuiz as getQuizService, deleteQuiz as deleteQuizService } from "./quizService";


export const generateQuiz =
  createAsyncThunk<
    Quiz,
    GenerateQuizRequest,
    {
      rejectValue: string;
    }
  >(
    "quiz/generateQuiz",

    async (body, thunkAPI) => {
      try {
        return await generateQuizState(body);
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.message ??
            "Failed to generate quiz"
        );
      }
    }
  );

export const getQuizzes =
  createAsyncThunk<
    Quiz[],
    string,
    {
      rejectValue: string;
    }
  >(
    "quiz/getQuizzes",

    async (documentId, thunkAPI) => {
      try {
        return await getQuizzesState(
          documentId
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.message ??
            "Failed to fetch quizzes"
        );
      }
    }
  );


  export const submitQuiz =
  createAsyncThunk<
    QuizResult,
    SubmitQuizRequest,
    {
      rejectValue: string;
    }
  >(
    "quiz/submitQuiz",

    async (body, thunkAPI) => {
      try {
        return await submitQuizState(body);
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.message ??
          "Failed to submit quiz"
        );
      }
    }
  );

  export const getQuizResults =
  createAsyncThunk<
    QuizResultsResponse,
    string,
    {
      rejectValue: string;
    }
  >(
    "quiz/getQuizResults",

    async (quizId, thunkAPI) => {
      try {
        return await getQuizResultsState(
          quizId
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.message ??
          "Failed to fetch quiz results"
        );
      }
    }
  );

  export const getQuiz = createAsyncThunk<
  Quiz,
  string,
  {
    rejectValue: string;
  }
>(
  "quiz/getQuiz",

  async (quizId, thunkAPI) => {
    try {
      return await getQuizService(
        quizId
      );
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message ?? "Failed to fetch quiz"
      );
    }
  }
);

export const deleteQuiz = createAsyncThunk<
  string,
  string,
  {
    rejectValue: string;
  }
>(
  "quiz/deleteQuiz",

  async (
    quizId,
    thunkAPI
  ) => {
    try {
      await deleteQuizService(
        quizId
      );

      return quizId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message ?? "Failed to delete quiz"
      );
    }
  }
);