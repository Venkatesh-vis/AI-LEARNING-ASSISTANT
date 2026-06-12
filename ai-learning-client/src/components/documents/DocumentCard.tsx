import {
  FileText,
  Clock3,
  Trash2,
  Layers3,
  ClipboardList,
} from "lucide-react";

type DocumentCardProps = {
  id: string;
  title: string;
  fileSize: number;
  flashcardCount: number;
  quizCount: number;
  uploadedDate: string;

  onClick: () => void;
  onDelete: () => void;
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

const formatUploadTime = (
  date: string
) => {
  const diff =
    Date.now() -
    new Date(date).getTime();

  const hours = Math.floor(
    diff / (1000 * 60 * 60)
  );

  if (hours < 1) {
    return "Uploaded just now";
  }

  if (hours < 24) {
    return `Uploaded ${hours} hour${
      hours > 1 ? "s" : ""
    } ago`;
  }

  const days = Math.floor(
    hours / 24
  );

  return `Uploaded ${days} day${
    days > 1 ? "s" : ""
  } ago`;
};

const DocumentCard = ({
  title,
  fileSize,
  flashcardCount,
  quizCount,
  uploadedDate,
  onClick,
  onDelete,
}: DocumentCardProps) => {
  return (
    <div
      onClick={onClick}
      className="
        group
        relative
        cursor-pointer
        rounded-3xl
        bg-white
        border
        border-slate-200
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:shadow-xl
        hover:shadow-slate-200/60
        hover:-translate-y-1
        hover:scale-[1.02]
      "
    >
      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="
          absolute
          top-4
          right-4
          h-9
          w-9
          rounded-xl
          bg-red-50
          text-red-500
          flex
          items-center
          justify-center
          opacity-0
          group-hover:opacity-100
          transition
          hover:bg-red-100
          cursor-pointer
        "
      >
        <Trash2 size={16} />
      </button>

      {/* Icon */}
      <div
        className="
          h-14
          w-14
          rounded-2xl
          bg-gradient-to-br
          from-emerald-400
          to-emerald-600
          flex
          items-center
          justify-center
          text-white
          shadow-lg
          shadow-emerald-500/20
        "
      >
        <FileText size={24} />
      </div>

      {/* Title */}
      <h3
        className="
          mt-5
          text-lg
          font-semibold
          text-slate-900
          line-clamp-2
        "
      >
        {title}
      </h3>

      {/* Size */}
      <p
        className="
          mt-2
          text-sm
          text-slate-500
        "
      >
        {formatFileSize(fileSize)}
      </p>

      {/* Badges */}
      {/* Stats */}
<div className="mt-4 flex flex-wrap gap-2">
  <div
    className="
      inline-flex
      items-center
      gap-2
      rounded-lg
      bg-violet-50
      px-3
      py-1.5
      text-xs
      font-medium
      text-violet-600
    "
  >
    <Layers3 size={14} />

    <span>
      {flashcardCount} Flashcards
    </span>
  </div>

  <div
    className="
      inline-flex
      items-center
      gap-2
      rounded-lg
      bg-emerald-50
      px-3
      py-1.5
      text-xs
      font-medium
      text-emerald-600
    "
  >
    <ClipboardList size={14} />

    <span>
      {quizCount} Quizzes
    </span>
  </div>
</div>

      {/* Footer */}
      <div
        className="
          mt-5
          border-t
          border-slate-100
          pt-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-slate-500
          "
        >
          <Clock3 size={14} />

          <span>
            {formatUploadTime(
              uploadedDate
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;