import { Plus } from "lucide-react";
import type { Quiz } from "../../features/quiz/quizTypes";
import QuizCard from "./QuizCard";

type QuizListProps = {
  quizzes: Quiz[];
  loading: boolean;

  onGenerate: () => void;

  onStart: (
    quizId: string
  ) => void;

  onViewResults: (
    quizId: string
  ) => void;

  onDelete: (
    quiz: Quiz
  ) => void;
};

const QuizList = ({
  quizzes,
  loading,
  onGenerate,
  onStart,
  onViewResults,
  onDelete,
}: QuizListProps) => {
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
            flex
            items-center
            gap-2
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
          <Plus size={18} />

          {loading
            ? "Generating..."
            : "Generate Quiz"}
        </button>
      </div>

      {/* Quiz Grid */}
      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        {quizzes.map(
          (quiz) => (
            <QuizCard
              key={quiz._id}
              quiz={quiz}
              onStart={() =>
                onStart(
                  quiz._id
                )
              }
              onViewResults={() =>
                onViewResults(
                  quiz._id
                )
              }
              onDelete={() =>
                onDelete(
                  quiz
                )
              }
            />
          )
        )}
      </div>
    </div>
  );
};

export default QuizList;