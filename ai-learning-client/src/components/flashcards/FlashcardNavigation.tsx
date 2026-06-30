import {ChevronLeft,ChevronRight} from "lucide-react";

type FlashcardNavigationProps = {
    current: number;
    total: number;
    onPrevious: () => void;
    onNext: () => void;
  };

const FlashcardNavigation = ({current,total,onPrevious,onNext}: FlashcardNavigationProps) => {
  return (
    <div
      className="
        mt-8
        flex
        items-center
        justify-center
        gap-4
      "
    >
      <button
        onClick={onPrevious}
        disabled={current === 0}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          px-5
          py-3
          disabled:opacity-50
          cursor-pointer
        "
      >
        <ChevronLeft size={16} />

        Previous
      </button>

      <div
        className="
          rounded-xl
          border
          border-slate-200
          px-5
          py-3
          font-medium
        "
      >
        {current + 1} / {total}
      </div>

      <button
        onClick={onNext}
        disabled={
          current === total - 1
        }
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          px-5
          py-3
          disabled:opacity-50
          cursor-pointer
        "
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default FlashcardNavigation;