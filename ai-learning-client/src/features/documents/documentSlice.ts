import { createSlice } from "@reduxjs/toolkit";
import type { DocumentState } from "./documentTypes";
import { uploadDocument, getDocuments, getDocumentById, deleteDocumentById, } from "./documentThunk";

const initialState: DocumentState = {
  document: null,
  documents: null,
  uploadDocumentLoading: false,
  getDocumentsLoading: false,
  getDocumentLoading: false,
  deleteDocumentLoading: false,
  error: null,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Upload Document
      .addCase(
        uploadDocument.pending,
        (state) => {
          state.uploadDocumentLoading = true;
          state.error = null;
        }
      )

      .addCase(
        uploadDocument.fulfilled,
        (state, action) => {
          state.uploadDocumentLoading = false;
          state.document = action.payload;
          if (!state.documents) {
            state.documents = [];
          }
          state.documents.unshift(action.payload);
        }
      )

      .addCase(
        uploadDocument.rejected,
        (state, action) => {
          state.uploadDocumentLoading = false;
          state.error = action.payload ?? "Document upload failed";
        }
      )

      // Get Documents
      .addCase(
        getDocuments.pending,
        (state) => {
          state.getDocumentsLoading = true;
          state.error = null;
        }
      )

      .addCase(
        getDocuments.fulfilled,
        (state, action) => {
          state.getDocumentsLoading = false;
          state.documents = action.payload;
        }

      )

      .addCase(
        getDocuments.rejected,
        (state, action) => {
          state.getDocumentsLoading = false;
          state.error = action.payload ?? "Failed to fetch documents";
        }
      )

      // Get Document By Id
      .addCase(
        getDocumentById.pending,
        (state) => {
          state.getDocumentLoading = true;
          state.error = null;
        }
      )

      .addCase(
        getDocumentById.fulfilled,
        (state, action) => {
          state.getDocumentLoading = false;
          state.document = action.payload;
        }
      )

      .addCase(
        getDocumentById.rejected,
        (state, action) => {
          state.getDocumentLoading = false;
          state.error = action.payload ?? "Failed to fetch document";
        }
      )


      .addCase(
        deleteDocumentById.pending,
        (state) => {
          state.deleteDocumentLoading = true;
          state.error = null;
        }
      )

      .addCase(
        deleteDocumentById.fulfilled,
        (state, action) => {
          state.deleteDocumentLoading = false;
          if (!state.documents) {
            state.documents = [];
          }
          state.documents = state.documents.filter((document) =>document._id !== action.payload);
          if (state.document?._id === action.payload) {
            state.document = null;
          }
        }
      )

      .addCase(
        deleteDocumentById.rejected,
        (state, action) => {
          state.deleteDocumentLoading = false;
          state.error = action.payload ?? "Failed to delete document";
        }
      )
  },
});

export default documentSlice.reducer;