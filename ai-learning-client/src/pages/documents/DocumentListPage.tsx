import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {useAppDispatch,useAppSelector,} from "../../features/hooks/reduxHooks";
import Spinner from "../../components/shared/Spinner";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import EmptyDocuments from "../../components/documents/EmptyDocuments";
import UploadDocumentModal from "../../components/documents/UploadDocumentModal";
import DocumentCard from "../../components/documents/DocumentCard";
import { deleteDocumentById, getDocuments, uploadDocument } from "../../features/documents/documentThunk";


const DocumentListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {documents,error,getDocumentsLoading,uploadDocumentLoading, deleteDocumentLoading} = useAppSelector((state) => state.document);
  const [showUpload, setShowUpload] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  

  useEffect(() => {
  if (!documents) {
    dispatch(getDocuments());
  }
}, []);

  const handleUpload = async (
    title: string,
    file: File
  ) => {
    try {
      await dispatch(
        uploadDocument({
          title,
          file,
        })
      ).unwrap();

      setShowUpload(false);
    } catch {
      // handled by redux
    }
  };  

  const handleDelete = async () => {
  if (!selectedDocument) {
    return;
  }

  try {
    await dispatch(deleteDocumentById(selectedDocument._id)).unwrap();
    setShowDelete(false);
    setSelectedDocument(null);
  } catch {
    //
  }
};

  if (getDocumentsLoading) {
    return (
      <div className="py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div
          className="
            flex
            flex-col
            gap-4
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <h1
              className="
                text-3xl
                font-bold
                text-slate-900
              "
            >
              Documents
            </h1>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              Upload and manage your
              learning documents.
            </p>
          </div>

          {documents?.length > 0 && (
            <button
              onClick={() =>
                setShowUpload(true)
              }
              className="
                h-12
                px-5
                rounded-xl
                bg-emerald-500
                text-white
                font-medium
                flex
                items-center
                gap-2
                hover:bg-emerald-600
                transition
                cursor-pointer
              "
            >
              <Plus size={18} />
              Upload Document
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            className="
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-red-600
            "
          >
            {error}
          </div>
        )}

        {/* Empty State */}
        {documents?.length === 0 && (
          <EmptyDocuments
            onUpload={() =>
              setShowUpload(true)
            }
          />
        )}

        {/* Documents Grid */}
        {documents?.length > 0 && (
          <div
            className="
              grid
              gap-6
              sm:grid-cols-2
              xl:grid-cols-3
              2xl:grid-cols-4
            "
          >
            {documents.map(
              (document) => (
                <DocumentCard
                  key={document._id}
                  id={document._id}
                  title={document.title}
                  fileSize={
                    document.fileSize
                  }
                  flashcardCount={
                    document.flashcardCount
                  }
                  quizCount={
                    document.quizCount
                  }
                  uploadedDate={
                    document.uploadedDate
                  }
                  onClick={() =>
                    navigate(
                      `/documents/${document._id}`
                    )
                  }
                  onDelete={() => {
                    setSelectedDocument(document);
                    setShowDelete(
                      true
                    );
                  }}
                />
              )
            )}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <UploadDocumentModal
        open={showUpload}
        loading={
          uploadDocumentLoading
        }
        onClose={() =>
          setShowUpload(false)
        }
        onUpload={handleUpload}
      />

      <ConfirmDialog
        open={showDelete}
        loading={deleteDocumentLoading}
        title="Delete Document"
        description={`Are you sure you want to delete "${selectedDocument?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onClose={() =>
          setShowDelete(false)
        }
        onConfirm={handleDelete}
      />
    </>
  );
};

export default DocumentListPage;