import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import documentReducer from "../features/documents/documentSlice";
import chatReducer from "../features/ai/chatSlice";
import summaryReducer from "../features/ai/summarySlice";
import quizReducer from "../features/ai/quizSlice";
import flascardReducer from "../features/ai/flashcardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    document: documentReducer,
    chat: chatReducer,
    summary: summaryReducer,
    quiz: quizReducer,
    flashcard: flascardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;