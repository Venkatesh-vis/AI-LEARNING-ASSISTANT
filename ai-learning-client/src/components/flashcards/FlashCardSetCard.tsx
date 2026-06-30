import { Brain, Trash2 } from "lucide-react";

import type {
  FlashcardSet,
} from "../../features/ai/aiTypes";

type FlashcardSetCardProps = {
  set: FlashcardSet;

  onOpen: () => void;

  onDelete: () => void;
};

const FlashcardSetCard = ({
  set,
  onOpen,
  onDelete,
}: FlashcardSetCardProps) => {
  return (
    <div
      onClick={onOpen}
      className="
        group
        relative
        cursor-pointer
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        transition-all
        duration-300
        hover:border-emerald-300
        hover:shadow-lg
        hover:shadow-emerald-100
      "
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="
          absolute
          right-4
          top-4
          opacity-0
          transition
          group-hover:opacity-100
          text-slate-400
          hover:text-red-500
          cursor-pointer
        "
      >
        <Trash2 size={18} />
      </button>

      <div
        className="
          mb-6
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-emerald-100
          text-emerald-600
        "
      >
        <Brain size={26} />
      </div>

      <h3
        className="
          text-lg
          font-semibold
          text-slate-900
        "
      >
        Flashcard Set
      </h3>

      <p
        className="
          mt-2
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-slate-400
        "
      >
        Created{" "}
        {new Date(
          set.createdAt
        ).toLocaleDateString()}
      </p>

      <div
        className="
          my-5
          border-t
          border-slate-100
        "
      />

      <span
        className="
          inline-flex
          rounded-xl
          bg-emerald-100
          px-4
          py-2
          text-sm
          font-medium
          text-emerald-700
        "
      >
        {set.cards.length} cards
      </span>
    </div>
  );
};

export default FlashcardSetCard;