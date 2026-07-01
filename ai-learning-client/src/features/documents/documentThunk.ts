import { createAsyncThunk } from "@reduxjs/toolkit";
import {uploadDocumentService,getDocumentsService,getDocumentByIdService, deleteDocumentService,} from "./documentService";
import type {UploadDocumentRequest, Document} from "./documentTypes";

export const uploadDocument =
  createAsyncThunk<
    Document,
    UploadDocumentRequest,
    { rejectValue: string }
  >(
    "document/upload",
    async (payload, thunkAPI) => {
      try {
        return await uploadDocumentService(payload);
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Document upload failed"
        );
      }
    }
  );

export const getDocuments =
  createAsyncThunk<
    Document[],
    void,
    { rejectValue: string }
  >(
    "document/getDocuments",
    async (_, thunkAPI) => {
      try {
        return await getDocumentsService();
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ?? "Failed to fetch documents"
        );
      }
    }
  );

export const getDocumentById =
  createAsyncThunk<
    Document,
    string,
    { rejectValue: string }
  >(
    "document/getById",
    async (id, thunkAPI) => {
      try {
        return await getDocumentByIdService(id);
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ?? "Failed to fetch document"
        );
      }
    }
  );


export const deleteDocumentById =
  createAsyncThunk<
    string,
    string,
    { rejectValue: string }
  >(
    "document/delete",
    async (id, thunkAPI) => {
      try {
        await deleteDocumentService(id);

        return id;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Failed to delete document"
        );
      }
    }
  );