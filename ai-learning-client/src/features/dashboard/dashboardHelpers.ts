import type { DashboardState } from "./dashboardTypes";
import type { Document } from "../documents/documentTypes";

export const addUploadedDocumentToDashboard = (
  state: DashboardState,
  document: Document
) => {
  if (!state.dashboard) {
    return;
  }

  state.dashboard.overview.totalDocuments += 1;

  state.dashboard.recentActivity.documents.unshift({
    _id: document._id,
    title: document.title,
    status: document.status,
    lastAccessed: document.lastAccessed,
  });

  state.dashboard.recentActivity.documents =
    state.dashboard.recentActivity.documents.slice(0, 5);
};


export const removeDocumentFromDashboard = (
  state: DashboardState,
  documentId: string
) => {
  if (!state.dashboard) {
    return;
  }

  state.dashboard.overview.totalDocuments =
    Math.max(
      0,
      state.dashboard.overview.totalDocuments - 1
    );

  state.dashboard.recentActivity.documents =
    state.dashboard.recentActivity.documents.filter(
      (document) =>
        document._id !== documentId
    );
};