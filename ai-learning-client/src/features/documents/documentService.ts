import { requestWithRetry } from "../../api/apiRequest";
import type {Document, UploadDocumentRequest, DeleteDocumentResponse} from "./documentTypes";

export const uploadDocumentService = (
  payload: UploadDocumentRequest
) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("file", payload.file);

  return requestWithRetry<Document>({
    url: "/document/upload",
    method: "POST",
    data: formData,
  });
};

export const getDocumentsService = () => {
  return requestWithRetry<Document[]>({
    url: "/document",
    method: "GET",
  });
};

export const getDocumentByIdService = (
  id: string
) => {
  return requestWithRetry<Document>({
    url: `/document/${id}`,
    method: "GET",
  });
};


export const deleteDocumentService = (
  id: string
) => {
  return requestWithRetry<DeleteDocumentResponse>({
    url: `/document/${id}`,
    method: "DELETE",
  });
};