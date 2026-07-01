import {
  ArrowRight,
  BookOpen,
  TrendingUp,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { FlashcardSet } from "../../features/ai/aiTypes";

type FlashcardLibraryCardProps = {
  flashcardSet: FlashcardSet;
  onDelete: () => void;
};

const FlashcardLibraryCard = ({
  flashcardSet,
  onDelete,
}: FlashcardLibraryCardProps) => {
  const navigate =
    useNavigate();

  const totalCards =
    flashcardSet.cards.length;

  const reviewedCards =
    flashcardSet.cards.filter(
      (card) =>
        card.reviewCount > 0
    ).length;

  const progress =
    totalCards === 0
      ? 0
      : Math.round(
          (reviewedCards /
            totalCards) *
            100
        );

  return (
    <div
      className="
        group
        flex
        flex-col
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-emerald-100
            text-emerald-600
          "
        >
          <BookOpen size={22} />
        </div>

        <button
          onClick={onDelete}
          className="
            rounded-lg
            p-2
            text-slate-400
            transition
            hover:bg-red-50
            hover:text-red-500
            cursor-pointer
          "
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Title */}

      <div className="mt-5">
        <h2
          className="
            line-clamp-2
            text-lg
            font-semibold
            leading-7
            text-slate-900
          "
        >
          {flashcardSet.documentId.title}
        </h2>

        <p
          className="
            mt-1
            text-xs
            font-medium
            uppercase
            tracking-wide
            text-slate-400
          "
        >
          CREATED{" "}
          {new Date(
            flashcardSet.createdAt
          ).toLocaleDateString()}
        </p>
      </div>

      {/* Stats */}

      <div className="mt-6 flex items-center justify-between">
        <div
          className="
            rounded-lg
            border
            border-slate-200
            px-3
            py-1.5
            text-sm
            font-medium
            text-slate-700
          "
        >
          {totalCards} Cards
        </div>

        <div
          className="
            inline-flex
            items-center
            gap-1
            rounded-lg
            bg-emerald-50
            px-3
            py-1.5
            text-sm
            font-semibold
            text-emerald-600
          "
        >
          <TrendingUp size={14} />
          {progress}%
        </div>
      </div>

      {/* Progress */}

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Progress
          </span>

          <span
            className="
              text-sm
              font-medium
              text-slate-700
            "
          >
            {reviewedCards}/{totalCards} reviewed
          </span>
        </div>

        <div
          className="
            h-2
            rounded-full
            bg-slate-200
            overflow-hidden
          "
        >
          <div
            className="
              h-full
              rounded-full
              bg-emerald-500
              transition-all
              duration-300
            "
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Button */}

      <button
        onClick={() =>
          navigate(
            `/flashcards/${flashcardSet._id}`
          )
        }
        className="
          mt-8
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-emerald-100
          py-3
          text-sm
          font-semibold
          text-emerald-700
          transition
          hover:bg-emerald-200
          cursor-pointer
        "
      >
        Study Now

        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default FlashcardLibraryCard;