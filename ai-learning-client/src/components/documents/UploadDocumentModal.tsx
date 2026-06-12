import {
  Upload,
  X,
} from "lucide-react";
import {
  useRef,
  useState,
} from "react";

type UploadDocumentModalProps = {
  open: boolean;
  loading?: boolean;

  onClose: () => void;

  onUpload: (
    title: string,
    file: File
  ) => void;
};

const UploadDocumentModal = ({
  open,
  loading = false,
  onClose,
  onUpload,
}: UploadDocumentModalProps) => {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [title, setTitle] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [error, setError] =
    useState("");

  if (!open) return null;

  const handleFileSelect = (
    selectedFile: File
  ) => {
    setError("");

    if (
      selectedFile.type !==
      "application/pdf"
    ) {
      setError(
        "Only PDF files are allowed"
      );
      return;
    }

    if (
      selectedFile.size >
      10 * 1024 * 1024
    ) {
      setError(
        "PDF must be smaller than 10MB"
      );
      return;
    }

    setFile(selectedFile);

    const extractedTitle =
      selectedFile.name.replace(
        /\.pdf$/i,
        ""
      );

    setTitle(extractedTitle);
  };

  const handleUpload = () => {
    if (!title.trim()) {
      setError(
        "Please enter document title"
      );
      return;
    }

    if (!file) {
      setError(
        "Please select a PDF file"
      );
      return;
    }

    onUpload(title, file);
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/30
        backdrop-blur-sm
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-3xl
          bg-white
          shadow-2xl
          p-7
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2
              className="
                text-2xl
                font-semibold
                text-slate-900
              "
            >
              Upload New Document
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Add a PDF document to your
              library
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              text-slate-400
              hover:text-slate-600
              cursor-pointer
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Title */}
        <div className="mt-8">
          <label
            className="
              text-xs
              font-semibold
              uppercase
              text-slate-600
            "
          >
            Document Title
          </label>

          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            placeholder="e.g. React Interview Prep"
            className="
              mt-2
              h-12
              w-full
              rounded-xl
              border
              border-slate-200
              px-4
              outline-none
              focus:border-emerald-500
              focus:ring-2
              focus:ring-emerald-100
            "
          />
        </div>

        {/* File Upload */}
        <div className="mt-6">
          <label
            className="
              text-xs
              font-semibold
              uppercase
              text-slate-600
            "
          >
            PDF File
          </label>

          <div
            onClick={() =>
              fileInputRef.current?.click()
            }
            onDragOver={(e) =>
              e.preventDefault()
            }
            onDrop={(e) => {
              e.preventDefault();

              const droppedFile =
                e.dataTransfer.files[0];

              if (droppedFile) {
                handleFileSelect(
                  droppedFile
                );
              }
            }}
            className="
              mt-2
              cursor-pointer
              rounded-2xl
              border-2
              border-dashed
              border-slate-200
              p-10
              text-center
              transition
              hover:border-emerald-300
              hover:bg-emerald-50/40
            "
          >
            <div
              className="
                mx-auto
                h-14
                w-14
                rounded-2xl
                bg-emerald-100
                flex
                items-center
                justify-center
              "
            >
              <Upload
                size={24}
                className="text-emerald-600"
              />
            </div>

            <p
              className="
                mt-4
                font-medium
                text-emerald-600
              "
            >
              Click to upload
            </p>

            <p
              className="
                text-slate-500
                text-sm
              "
            >
              or drag and drop
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-400
              "
            >
              PDF up to 10MB
            </p>

            {file && (
              <div
                className="
                  mt-5
                  rounded-xl
                  bg-emerald-50
                  p-3
                  text-sm
                  font-medium
                  text-emerald-700
                "
              >
                {file.name}
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) => {
              const selectedFile =
                e.target.files?.[0];

              if (selectedFile) {
                handleFileSelect(
                  selectedFile
                );
              }
            }}
          />
        </div>

        {/* Error */}
        {error && (
          <div
            className="
              mt-4
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
            "
          >
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="
              h-12
              rounded-xl
              border
              border-slate-200
              bg-white
              font-medium
              hover:bg-slate-50
              cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="
              h-12
              rounded-xl
              bg-emerald-500
              text-white
              font-medium
              shadow-lg
              shadow-emerald-500/20
              hover:bg-emerald-600
              cursor-pointer
              disabled:opacity-70
            "
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div
                  className="
                    h-4
                    w-4
                    rounded-full
                    border-2
                    border-white/30
                    border-t-white
                    animate-spin
                  "
                />
                Uploading...
              </span>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;