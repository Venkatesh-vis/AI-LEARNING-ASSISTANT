import { createAsyncThunk } from "@reduxjs/toolkit";
import {getChatHistoryService,askQuestionService,generateSummaryService,explainConceptService,generateFlashcardsService, getFlashcardSetsService, reviewFlashcardService, toggleFlashcardStarService, deleteFlashcardsService,} from "./aiService";
import type {ChatMessage,AskQuestionRequest,AskQuestionResponse,GenerateSummaryRequest,Summary,ExplainConceptRequest,ConceptExplanation,GenerateFlashcardsRequest,FlashcardSet} from "./aiTypes";

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
   FLASHCARDS
========================= */

export const getFlashcardSets =
  createAsyncThunk<
    FlashcardSet[],
    void,
    { rejectValue: string }
  >(
    "flashcards/getSets",
    async (_, thunkAPI) => {
      try {
        return await getFlashcardSetsService();
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Failed to fetch flashcard sets"
        );
      }
    }
  );

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

export const reviewFlashcard =
  createAsyncThunk<
    FlashcardSet,
    string,
    { rejectValue: string }
  >(
    "flashcards/review",
    async (
      cardId,
      thunkAPI
    ) => {
      try {
        return await reviewFlashcardService(
          cardId
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Failed to review flashcard"
        );
      }
    }
  );

export const toggleFlashcardStar =
  createAsyncThunk<
    FlashcardSet,
    string,
    { rejectValue: string }
  >(
    "flashcards/star",
    async (
      cardId,
      thunkAPI
    ) => {
      try {
        return await toggleFlashcardStarService(
          cardId
        );
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Failed to update flashcard"
        );
      }
    }
  );

export const deleteFlashcards =
  createAsyncThunk<
    string,
    string,
    { rejectValue: string }
  >(
    "flashcards/delete",
    async (
      setId,
      thunkAPI
    ) => {
      try {
        await deleteFlashcardsService(
          setId
        );

        return setId;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Failed to delete flashcards"
        );
      }
    }
  );