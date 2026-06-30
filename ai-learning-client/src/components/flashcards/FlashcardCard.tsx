import { Star, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

import type {
  Flashcard,
} from "../../features/ai/aiTypes";

type FlashcardCardProps = {
  card: Flashcard;
  flipped: boolean;
  onFlip: () => void;
  onStar: () => void;
};

const FlashcardCard = ({
  card,
  flipped,
  onFlip,
  onStar,
}: FlashcardCardProps) => {
  return (
    <motion.div
      key={`${card._id}-${flipped}`}
      initial={{
        rotateY: 90,
        opacity: 0,
      }}
      animate={{
        rotateY: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
      }}
      onClick={onFlip}
      className={`
        relative
        flex
        min-h-[350px]
        w-full
        max-w-3xl
        cursor-pointer
        flex-col
        rounded-3xl
        p-8
        shadow-xl

        ${
          flipped
            ? `
              bg-gradient-to-r
              from-emerald-500
              to-emerald-400
              text-white
            `
            : `
              border
              border-slate-200
              bg-white
            `
        }
      `}
    >
      <div
        className="
          flex
          items-start
          justify-between
        "
      >
        <span
          className={`
            rounded-lg
            px-3
            py-1
            text-xs
            font-semibold
            uppercase

            ${
              flipped
                ? "bg-white/20 text-white"
                : "bg-slate-100 text-slate-600"
            }
          `}
        >
          {card.difficulty}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onStar();
          }}
          className={`
            rounded-xl
            p-2
            cursor-pointer

            ${
              flipped
                ? "bg-white/20"
                : "bg-slate-100"
            }
          `}
        >
          <Star
            size={18}
            fill={
              card.isStarred
                ? "currentColor"
                : "none"
            }
          />
        </button>
      </div>

      <div
        className="
          flex
          flex-1
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        <h2
          className="
            text-2xl
            font-semibold
            leading-relaxed
          "
        >
          {flipped
            ? card.answer
            : card.question}
        </h2>

        <div
          className={`
            mt-8
            flex
            items-center
            gap-2
            text-sm

            ${
              flipped
                ? "text-white/80"
                : "text-slate-400"
            }
          `}
        >
          <RotateCcw size={14} />

          {flipped
            ? "Click to see question"
            : "Click to reveal answer"}
        </div>
      </div>
    </motion.div>
  );
};

export default FlashcardCard;