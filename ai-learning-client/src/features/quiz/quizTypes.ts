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

export interface QuizDocument {
  _id: string;
  title: string;
}

export interface Quiz {
  _id: string;
  userId: string;
  documentId: string | QuizDocument;
  title: string;
  questions: QuizQuestion[];
  userAnswers: string[];
  score: number;
  totalQuestions: number;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}


export interface SubmitQuizAnswer {
  questionIndex: number;
  selectedAnswer: string;
}

export interface SubmitQuizRequest {
  quizId: string;
  answers: SubmitQuizAnswer[];
}

export interface SubmittedAnswer {
  questionIndex: number;
  selectedAnswer: string;
  isCorrect: boolean;
  answeredAt: string;
}

export interface QuizResult {
  quizId: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  userAnswers: SubmittedAnswer[];
}

export interface QuizResultSummary {
  id: string;
  title: string;
  document: QuizDocument;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export interface QuizResultItem {
  questionIndex: number;
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizResultsResponse {
  quiz: QuizResultSummary;
  results: QuizResultItem[];
}

export interface DeleteQuizResponse {
  success: boolean;
  message: string;
}

export interface QuizState {
  quiz: Quiz | null;
  quizzes: Quiz[];
  quizResult: QuizResult | null;
  quizResults: QuizResultsResponse | null;
  generateQuizLoading: boolean;
  getQuizzesLoading: boolean;
  getQuizLoading: boolean;
  submitQuizLoading: boolean;
  getQuizResultsLoading: boolean;
  deleteQuizLoading: boolean;
  error: string | null;
}