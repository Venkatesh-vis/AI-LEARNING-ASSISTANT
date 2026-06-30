import { ClipboardList } from "lucide-react";

type EmptyQuizzesProps = {
  loading: boolean;
  onGenerate: () => void;
};

const EmptyQuizzes = ({
  loading,
  onGenerate,
}: EmptyQuizzesProps) => {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      {/* Header */}
      <div
        className="
          mb-6
          flex
          items-center
          justify-end
        "
      >
        <button
          onClick={onGenerate}
          disabled={loading}
          className="
            rounded-xl
            bg-emerald-500
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-emerald-600
            disabled:cursor-not-allowed
            disabled:opacity-60
            cursor-pointer
          "
        >
          {loading
            ? "Generating..."
            : "Generate Quiz"}
        </button>
      </div>

      {/* Empty State */}
      <div
        className="
          flex
          min-h-[380px]
          flex-col
          items-center
          justify-center
          rounded-3xl
          border-2
          border-dashed
          border-slate-200
          px-6
          text-center
        "
      >
        <div
          className="
            flex
            h-18
            w-18
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
            text-slate-400
          "
        >
          <ClipboardList
            size={34}
          />
        </div>

        <h2
          className="
            mt-6
            text-xl
            font-semibold
            text-slate-900
          "
        >
          No Quizzes Yet
        </h2>

        <p
          className="
            mt-3
            max-w-md
            text-sm
            leading-6
            text-slate-500
          "
        >
          Generate an AI-powered quiz from
          this document to test your
          understanding and reinforce your
          learning.
        </p>
      </div>
    </div>
  );
};

export default EmptyQuizzes;