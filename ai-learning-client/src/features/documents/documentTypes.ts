export interface Document {
  _id: string;
  userId: string;
  title: string;
  filePath: string;
  cloudinaryPublicId: string;
  fileSize: number;
  status: string;
  uploadedDate: string;
  lastAccessed: string;
  createdAt: string;
  updatedAt: string;
  flashcardCount: number;
  quizCount: number;
}

export interface UploadDocumentRequest {
  title: string;
  file: File;
}

export interface DocumentResponse {
  data: Document;
}

export interface DocumentState {
  document: Document | null;
  documents: Document[] | null;
  uploadDocumentLoading: boolean;
  getDocumentsLoading: boolean;
  getDocumentLoading: boolean;
  deleteDocumentLoading: boolean;
  error: string | null;
}

export interface DeleteDocumentResponse {
  message: string;
}