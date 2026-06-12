export type DashboardOverview = {
  totalDocuments: number;
  totalFlashCardSets: number;
  totalFlashCards: number;
  reviewedFlashCards: number;
  starredFlashCards: number;
  averageScore: number;
  totalQuizzes: number;
  completedQuizzes: number;
}

export type RecentDocument = {
  _id: string;
  title: string;
  status: string;
  lastAccessed: string;
}

export type QuizDocument = {
  _id: string;
  title: string;
}

export type RecentQuiz = {
  _id: string;
  documentId: QuizDocument;
  title: string;
  score: number;
  totalQuestions: number;
  completedAt: string | null;
}

export type RecentActivity = {
  documents: RecentDocument[];
  quizzes: RecentQuiz[];
}

export type DashboardData = {
  overview: DashboardOverview;
  recentActivity: RecentActivity;
}

export type DashboardState = {
  dashboard: DashboardData | null;
  loading: boolean;
  error: string | null;
}