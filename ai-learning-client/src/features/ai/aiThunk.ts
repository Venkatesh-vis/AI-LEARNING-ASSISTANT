import { createAsyncThunk } from "@reduxjs/toolkit";
import {getChatHistoryService,askQuestionService,generateSummaryService,explainConceptService,generateQuizService,generateFlashcardsService,} from "./aiService";
import type {ChatMessage,AskQuestionRequest,AskQuestionResponse,GenerateSummaryRequest,Summary,ExplainConceptRequest,ConceptExplanation,GenerateQuizRequest,Quiz,GenerateFlashcardsRequest,FlashcardSet} from "./aiTypes";

/* =========================
   CHAT
========================= */

export const getChatHistory =
  createAsyncThunk<
    ChatMessage[],
    string,
    { rejectValue: string }
  >(
    "chat/history",
    async (documentId, thunkAPI) => {
      try {
        return await getChatHistoryService(
          documentId
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Failed to fetch chat history"
        );
      }
    }
  );

export const askQuestion =
  createAsyncThunk<
    AskQuestionResponse,
    AskQuestionRequest,
    { rejectValue: string }
  >(
    "chat/askQuestion",
    async (payload, thunkAPI) => {
      try {
        return await askQuestionService(
          payload
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Failed to generate response"
        );
      }
    }
  );

/* =========================
   SUMMARY
========================= */

export const generateSummary =
  createAsyncThunk<
    Summary,
    GenerateSummaryRequest,
    { rejectValue: string }
  >(
    "summary/generate",
    async (payload, thunkAPI) => {
      try {
        return await generateSummaryService(
          payload
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Failed to generate summary"
        );
      }
    }
  );

export const explainConcept =
  createAsyncThunk<
    ConceptExplanation,
    ExplainConceptRequest,
    { rejectValue: string }
  >(
    "summary/explainConcept",
    async (payload, thunkAPI) => {
      try {
        return await explainConceptService(
          payload
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Failed to explain concept"
        );
      }
    }
  );

/* =========================
   QUIZ
========================= */

export const generateQuiz =
  createAsyncThunk<
    Quiz,
    GenerateQuizRequest,
    { rejectValue: string }
  >(
    "quiz/generate",
    async (payload, thunkAPI) => {
      try {
        return await generateQuizService(
          payload
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Failed to generate quiz"
        );
      }
    }
  );

/* =========================
   FLASHCARDS
========================= */

export const generateFlashcards =
  createAsyncThunk<
    FlashcardSet,
    GenerateFlashcardsRequest,
    { rejectValue: string }
  >(
    "flashcards/generate",
    async (payload, thunkAPI) => {
      try {
        return await generateFlashcardsService(
          payload
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Failed to generate flashcards"
        );
      }
    }
  );