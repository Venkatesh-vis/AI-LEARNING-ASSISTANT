export interface ChatMessage {
  _id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  relevantChunks: number[];
}

/* =========================
   CHAT
========================= */

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  sendMessageLoading: boolean;
  error: string | null;
}

export interface AskQuestionRequest {
  documentId: string;
  question: string;
}

export interface AskQuestionResponse {
  question: string;
  answer: string;
  relevantChunks: number[];
  chatHistory: string;
}

/* =========================
   SUMMARY
========================= */

export interface GenerateSummaryRequest {
  documentId: string;
}

export interface Summary {
  documentId: string;
  title: string;
  summary: string;
}

export interface ExplainConceptRequest {
  documentId: string;
  concept: string;
}

export interface ConceptExplanation {
  concept: string;
  explanation: string;
  relevantChunks: number[];
}

export interface SummaryState {
  summary: Summary | null;
  concepts: Record<string,ConceptExplanation>;
  conceptExplanation: ConceptExplanation | null;
  generateSummaryLoading: boolean;
  explainConceptLoading: boolean;
  error: string | null;
}

/* =========================
   QUIZ
========================= */

export interface GenerateQuizRequest {
  documentId: string;
  numQuestions: number;
  title: string;
}

export interface QuizQuestion {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface Quiz {
  _id: string;
  userId: string;
  documentId: string;
  title: string;
  questions: QuizQuestion[];
  userAnswers: string[];
  score: number;
  totalQuestions: number;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface QuizState {
  quiz: Quiz | null;
  generateQuizLoading: boolean;
  error: string | null;
}

/* =========================
   FLASHCARDS
========================= */

export interface GenerateFlashcardsRequest {
  documentId: string;
  count: number;
}

export interface Flashcard {
  _id: string;
  question: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
  reviewCount: number;
  isStarred: boolean;
  lastReviewed: string;
}

export interface FlashcardSet {
  _id: string;
  userId: string;
  documentId: string;
  cards: Flashcard[];
  createdAt: string;
  updatedAt: string;
}

export interface FlashcardState {
  flashcards: FlashcardSet | null;
  generateFlashcardsLoading: boolean;
  error: string | null;
}