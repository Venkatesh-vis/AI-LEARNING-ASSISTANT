import { requestWithRetry } from "../../api/apiRequest";
import type { DeleteQuizResponse, GenerateQuizRequest, Quiz, QuizResult, QuizResultsResponse, SubmitQuizRequest } from "./quizTypes";


export const generateQuizState = (
  body: GenerateQuizRequest
) => {
  return requestWithRetry<Quiz>({
    url: "/ai/generate-quiz",
    method: "POST",
    data: body,
  });
};

export const getQuizzesState = (
  documentId: string
) => {
  return requestWithRetry<Quiz[]>({
    url: `/quizzes/${documentId}`,
    method: "GET",
  });
};

export const submitQuizState = (
  body: SubmitQuizRequest
) => {
  return requestWithRetry<QuizResult>({
    url: `/quizzes/${body.quizId}/submit`,
    method: "POST",
    data: {
      answers: body.answers,
    },
  });
};

export const getQuizResultsState = (
  quizId: string
) => {
  return requestWithRetry<QuizResultsResponse>({
    url: `/quizzes/${quizId}/results`,
    method: "GET",
  });
};

export const getQuiz = (
  quizId: string
) => {
  return requestWithRetry<Quiz>({
    url: `/quizzes/quiz/${quizId}`,
    method: "GET",
  });
};

export const deleteQuiz = (
  quizId: string
) => {
  return requestWithRetry<DeleteQuizResponse>({
    url: `/quizzes/${quizId}`,
    method: "DELETE",
  });
};