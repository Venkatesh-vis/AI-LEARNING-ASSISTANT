import {ExternalLink,FileText,Calendar,HardDrive,} from "lucide-react";
import type {Document} from "../../features/documents/documentTypes"

type ContentProps = {
  document: Document;
};

const formatFileSize = (
  bytes: number
) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
};

const Content = ({
  document,
}: ContentProps) => {
  return (
    <div className="space-y-6">
      {/* Viewer */}
      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-4
          "
        >
          <h3
            className="
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Document Viewer
          </h3>

          <a
            href={document.filePath}
            target="_blank"
            rel="noreferrer"
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-blue-600
              hover:text-blue-700
            "
          >
            <ExternalLink size={16} />
            Open in new tab
          </a>
        </div>

        <iframe
          src={document.filePath}
          title={document.title}
          className="
  h-[500px]
  md:h-[700px]
  xl:h-[900px]
  w-full
"
        />
      </div>

      {/* Info Cards */}
      <div
  className="
    grid
    grid-cols-1
    sm:grid-cols-2
    xl:grid-cols-3
    gap-4
  "
>
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                rounded-xl
                bg-emerald-50
                p-3
                text-emerald-600
              "
            >
              <FileText size={18} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Status
              </p>

              <p className="font-semibold capitalize">
                {document.status}
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                rounded-xl
                bg-blue-50
                p-3
                text-blue-600
              "
            >
              <HardDrive size={18} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                File Size
              </p>

              <p className="font-semibold">
                {formatFileSize(
                  document.fileSize
                )}
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                rounded-xl
                bg-violet-50
                p-3
                text-violet-600
              "
            >
              <Calendar size={18} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Uploaded
              </p>

              <p className="font-semibold">
                {new Date(
                  document.uploadedDate
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;