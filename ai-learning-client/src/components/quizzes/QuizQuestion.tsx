import type {
  QuizQuestion as QuizQuestionType,
} from "../../features/quiz/quizTypes";
import QuizOption from "./QuizOption";

type QuizQuestionProps = {
  question: QuizQuestionType;
  selectedAnswer?: string;

  onSelect: (
    answer: string
  ) => void;
};

const QuizQuestion = ({
  question,
  selectedAnswer,
  onSelect,
}: QuizQuestionProps) => {
  const getDifficultyStyle =
    () => {
      switch (
        question.difficulty
      ) {
        case "easy":
          return "bg-emerald-100 text-emerald-700";

        case "medium":
          return "bg-amber-100 text-amber-700";

        case "hard":
          return "bg-red-100 text-red-700";

        default:
          return "bg-slate-100 text-slate-700";
      }
    };

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
    >
      {/* Difficulty */}

      <div className="mb-6">
        <span
          className={`
            inline-flex
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            capitalize
            ${getDifficultyStyle()}
          `}
        >
          {question.difficulty}
        </span>
      </div>

      {/* Question */}

      <h2
        className="
          text-2xl
          font-semibold
          leading-9
          text-slate-900
        "
      >
        {question.question}
      </h2>

      {/* Options */}

      <div className="mt-8 space-y-4">
        {question.options.map(
          (option) => (
            <QuizOption
              key={option}
              option={option}
              selected={
                selectedAnswer ===
                option
              }
              onClick={() =>
                onSelect(option)
              }
            />
          )
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;