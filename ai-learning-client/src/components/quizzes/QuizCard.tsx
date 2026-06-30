import {
  Calendar,
  Clock3,
  Play,
  Eye,
  Trash2,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

import type { Quiz } from "../../features/quiz/quizTypes";

type QuizCardProps = {
  quiz: Quiz;

  onStart: () => void;
  onViewResults: () => void;
  onDelete: () => void;
};

const QuizCard = ({
  quiz,
  onStart,
  onViewResults,
  onDelete,
}: QuizCardProps) => {
  const isCompleted =
    quiz.completedAt !== null;

  return (
    <div
      className="
        group
        relative
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:shadow-slate-200/60
      "
    >
      {/* Delete */}

      <button
        onClick={onDelete}
        className="
          absolute
          right-4
          top-4
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          bg-red-50
          text-red-500
          opacity-0
          transition
          hover:bg-red-100
          group-hover:opacity-100
          cursor-pointer
        "
      >
        <Trash2 size={16} />
      </button>

      {/* Icon */}

      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-slate-500
          to-slate-700
          text-white
          shadow-lg
          shadow-slate-500/20
        "
      >
        <ClipboardList
          size={24}
        />
      </div>

      {/* Title */}

      <h3
        className="
          mt-5
          line-clamp-2
          text-lg
          font-semibold
          text-slate-900
        "
      >
        {quiz.title}
      </h3>

      {/* Questions */}

      <div
        className="
          mt-4
          inline-flex
          items-center
          gap-2
          rounded-lg
          bg-violet-50
          px-3
          py-1.5
          text-xs
          font-medium
          text-violet-700
        "
      >
        <ClipboardList
          size={14}
        />

        {quiz.totalQuestions} Questions
      </div>

      {/* Status */}

      <div
        className="
          mt-4
          flex
          items-center
          justify-between
        "
      >
        <div
          className={`
            inline-flex
            items-center
            gap-2
            rounded-lg
            px-3
            py-1.5
            text-xs
            font-medium

            ${
              isCompleted
                ? `
                  bg-emerald-50
                  text-emerald-700
                `
                : `
                  bg-amber-50
                  text-amber-700
                `
            }
          `}
        >
          <CheckCircle2
            size={14}
          />

          {isCompleted
            ? "Completed"
            : "Not Attempted"}
        </div>

        {isCompleted && (
          <span
            className="
              text-sm
              font-bold
              text-emerald-600
            "
          >
            {quiz.score}%
          </span>
        )}
      </div>

      {/* Footer */}

      <div
        className="
          mt-5
          space-y-2
          border-t
          border-slate-100
          pt-4
          text-sm
          text-slate-500
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <Calendar
            size={14}
          />

          {new Date(
            quiz.createdAt
          ).toLocaleDateString()}
        </div>

        {quiz.completedAt && (
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Clock3
              size={14}
            />

            Completed
          </div>
        )}
      </div>

      {/* Actions */}

      <div
        className="
          mt-6
          flex
          gap-3
        "
      >
        <button
          onClick={onStart}
          className="
            flex-1
            rounded-xl
            bg-emerald-500
            px-4
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-emerald-600
            cursor-pointer
          "
        >
          <span
            className="
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <Play size={16} />

            {isCompleted
              ? "Retake"
              : "Start"}
          </span>
        </button>

        {isCompleted && (
          <button
            onClick={
              onViewResults
            }
            className="
              flex
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              text-slate-700
              transition
              hover:bg-slate-50
              cursor-pointer
            "
          >
            <Eye size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizCard;