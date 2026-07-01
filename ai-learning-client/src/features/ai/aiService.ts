import { requestWithRetry } from "../../api/apiRequest";
import type { GenerateQuizRequest, Quiz } from "../quiz/quizTypes";
import type {ChatMessage,AskQuestionRequest,AskQuestionResponse,GenerateSummaryRequest,Summary,ExplainConceptRequest,ConceptExplanation,GenerateFlashcardsRequest,FlashcardSet, DeleteFlashcardsResponse,} from "./aiTypes";

/* =========================
   CHAT
========================= */

export const getChatHistoryService = (
  documentId: string
) => {
  return requestWithRetry<ChatMessage[]>({
    url: `/ai/chat-history/${documentId}`,
    method: "GET",
  });
};

export const askQuestionService = (
  payload: AskQuestionRequest
) => {
  return requestWithRetry<AskQuestionResponse>({
    url: "/ai/chat",
    method: "POST",
    data: payload,
  });
};

/* =========================
   SUMMARY
========================= */

export const generateSummaryService = (
  payload: GenerateSummaryRequest
) => {
  return requestWithRetry<Summary>({
    url: "/ai/generate-summary",
    method: "POST",
    data: payload,
  });
};

export const explainConceptService = (
  payload: ExplainConceptRequest
) => {
  return requestWithRetry<ConceptExplanation>({
    url: "/ai/explain-concept",
    method: "POST",
    data: payload,
  });
};

/* =========================
   QUIZ
========================= */

export const generateQuizService = (
  payload: GenerateQuizRequest
) => {
  return requestWithRetry<Quiz>({
    url: "/ai/generate-quiz",
    method: "POST",
    data: payload,
  });
};

/* =========================
   FLASHCARDS
========================= */

export const generateFlashcardsService = (
  payload: GenerateFlashcardsRequest
) => {
  return requestWithRetry<FlashcardSet>({
    url: "/ai/generate-flashcards",
    method: "POST",
    data: payload,
  });
};

export const getFlashcardSetsService =
  () => {
    return requestWithRetry<
      FlashcardSet[]
    >({
      url: "/flashcards",
      method: "GET",
    });
  };

export const getFlashcardSetService =
  (
    documentId: string,
    setId: string
  ) => {
    return requestWithRetry<
      FlashcardSet
    >({
      url: `/flashcards/${documentId}/${setId}`,
      method: "GET",
    });
  };

export const reviewFlashcardService =
  (
    cardId: string
  ) => {
    return requestWithRetry<
      FlashcardSet
    >({
      url: `/flashcards/${cardId}/review`,
      method: "POST",
    });
  };

export const toggleFlashcardStarService =
  (
    cardId: string
  ) => {
    return requestWithRetry<
      FlashcardSet
    >({
      url: `/flashcards/${cardId}/star`,
      method: "PUT",
    });
  };

export const deleteFlashcardsService =
  (
    setId: string
  ) => {
    return requestWithRetry<
      DeleteFlashcardsResponse
    >({
      url: `/flashcards/${setId}`,
      method: "DELETE",
    });
  };