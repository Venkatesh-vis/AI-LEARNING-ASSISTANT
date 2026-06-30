import { createSlice } from "@reduxjs/toolkit";
import { getChatHistory, askQuestion, } from "./aiThunk";
import type { ChatState, } from "./aiTypes";

const initialState: ChatState = {
  messages: [],
  loading: false,
  sendMessageLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* =========================
         GET CHAT HISTORY
      ========================= */

      .addCase(
        getChatHistory.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getChatHistory.fulfilled,
        (state, action) => {
          state.loading = false;
          state.messages =
            action.payload;
        }
      )

      .addCase(
        getChatHistory.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload ?? "Failed to fetch chat history";
        }
      )

      /* =========================
         ASK QUESTION
      ========================= */

      .addCase(
        askQuestion.pending,
        (state, action) => {
          state.sendMessageLoading = true;
          state.error = null;

          state.messages.push({
            _id: crypto.randomUUID(),
            role: "user",
            content: action.meta.arg.question,
            timestamp: new Date().toISOString(),
            relevantChunks: [],
          });
        }
      )

      .addCase(
        askQuestion.fulfilled,
        (state, action) => {
          state.sendMessageLoading = false;

          state.messages.push({
            _id: crypto.randomUUID(),
            role: "assistant",
            content: action.payload.answer,
            timestamp: new Date().toISOString(),
            relevantChunks: action.payload.relevantChunks,
          });
        }
      )

      .addCase(
        askQuestion.rejected,
        (state, action) => {
          state.sendMessageLoading = false;
          state.error = action.payload ?? "Failed to generate response";

          state.messages.push({
            _id: crypto.randomUUID(),
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
            timestamp: new Date().toISOString(),
            relevantChunks: [],
          });
        }
      )
  },
});

export default chatSlice.reducer;