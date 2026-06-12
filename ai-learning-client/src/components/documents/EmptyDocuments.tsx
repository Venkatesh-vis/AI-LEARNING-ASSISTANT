import { FileText, Plus } from "lucide-react";

type EmptyDocumentsProps = {
  onUpload: () => void;
};

const EmptyDocuments = ({
  onUpload,
}: EmptyDocumentsProps) => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-24
        text-center
      "
    >
      {/* Icon */}
      <div
        className="
          h-28
          w-28
          rounded-3xl
          bg-slate-100
          flex
          items-center
          justify-center
        "
      >
        <FileText
          size={42}
          className="text-slate-400"
        />
      </div>

      {/* Title */}
      <h2
        className="
          mt-8
          text-3xl
          font-bold
          text-slate-900
        "
      >
        No Documents Yet
      </h2>

      {/* Description */}
      <p
        className="
          mt-3
          max-w-md
          text-slate-500
          leading-7
        "
      >
        Get started by uploading your
        first PDF document to begin
        learning.
      </p>

      {/* Upload Button */}
      <button
        onClick={onUpload}
        className="
          mt-10
          h-12
          px-8
          rounded-xl
          bg-emerald-500
          text-white
          font-medium
          shadow-lg
          shadow-emerald-500/20
          hover:bg-emerald-600
          transition
          flex
          items-center
          gap-2
          cursor-pointer
        "
      >
        <Plus size={18} />
        Upload Document
      </button>
    </div>
  );
};

export default EmptyDocuments;