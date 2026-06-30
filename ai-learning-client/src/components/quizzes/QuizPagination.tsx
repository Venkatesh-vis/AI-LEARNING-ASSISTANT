import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

type QuizPaginationProps = {
  current: number;
  total: number;

  canSubmit: boolean;
  loading: boolean;

  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

const QuizPagination = ({
  current,
  total,
  canSubmit,
  loading,
  onPrevious,
  onNext,
  onSubmit,
}: QuizPaginationProps) => {
  const isFirstQuestion =
    current === 0;

  const isLastQuestion =
    current === total - 1;

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        border-t
        border-slate-200
        pt-6
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      {/* Previous */}

      <button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-5
          py-3
          font-medium
          text-slate-700
          transition
          hover:bg-slate-50
          disabled:cursor-not-allowed
          disabled:opacity-50
          cursor-pointer
        "
      >
        <ArrowLeft size={18} />
        Previous
      </button>

      {/* Question Count */}

      <div
        className="
          text-center
          text-sm
          font-medium
          text-slate-500
        "
      >
        Question{" "}
        <span className="font-semibold text-slate-800">
          {current + 1}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-800">
          {total}
        </span>
      </div>

      {/* Next / Submit */}

      {!isLastQuestion ? (
        <button
          onClick={onNext}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-emerald-500
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:bg-emerald-600
            cursor-pointer
          "
        >
          Next
          <ArrowRight size={18} />
        </button>
      ) : (
        <button
          onClick={onSubmit}
          disabled={
            !canSubmit ||
            loading
          }
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-emerald-500
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-emerald-600
            disabled:cursor-not-allowed
            disabled:opacity-60
            cursor-pointer
          "
        >
          <CheckCircle2 size={18} />

          {loading
            ? "Submitting..."
            : "Submit Quiz"}
        </button>
      )}
    </div>
  );
};

export default QuizPagination;