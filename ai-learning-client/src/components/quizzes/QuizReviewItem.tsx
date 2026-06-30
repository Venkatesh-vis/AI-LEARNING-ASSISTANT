import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

import type {
  QuizReviewResult,
} from "../../features/quiz/quizTypes";

type QuizReviewItemProps = {
  result: QuizReviewResult;
};

const QuizReviewItem = ({
  result,
}: QuizReviewItemProps) => {
  return (
    <div
      className={`
        rounded-2xl
        border
        p-6

        ${
          result.isCorrect
            ? `
              border-emerald-200
              bg-emerald-50
            `
            : `
              border-red-200
              bg-red-50
            `
        }
      `}
    >
      {/* Header */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <h3
          className="
            flex-1
            text-lg
            font-semibold
            text-slate-900
          "
        >
          Q{result.questionIndex + 1}.{" "}
          {result.question}
        </h3>

        <div
          className={`
            flex
            items-center
            gap-2
            rounded-full
            px-3
            py-1
            text-sm
            font-medium

            ${
              result.isCorrect
                ? `
                  bg-emerald-100
                  text-emerald-700
                `
                : `
                  bg-red-100
                  text-red-700
                `
            }
          `}
        >
          {result.isCorrect ? (
            <>
              <CheckCircle2
                size={16}
              />
              Correct
            </>
          ) : (
            <>
              <XCircle
                size={16}
              />
              Incorrect
            </>
          )}
        </div>
      </div>

      {/* Options */}

      <div className="mt-6 space-y-3">
        {result.options.map(
          (option) => {
            const isCorrect =
              option ===
              result.correctAnswer;

            const isSelected =
              option ===
              result.selectedAnswer;

            return (
              <div
                key={option}
                className={`
                  rounded-xl
                  border
                  px-4
                  py-3
                  transition

                  ${
                    isCorrect
                      ? `
                        border-emerald-300
                        bg-emerald-100
                      `
                      : isSelected
                      ? `
                        border-red-300
                        bg-red-100
                      `
                      : `
                        border-slate-200
                        bg-white
                      `
                  }
                `}
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <span
                    className="
                      text-slate-800
                    "
                  >
                    {option}
                  </span>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    {isCorrect && (
                      <span
                        className="
                          rounded-full
                          bg-emerald-500
                          px-2
                          py-1
                          text-xs
                          font-medium
                          text-white
                        "
                      >
                        Correct
                      </span>
                    )}

                    {!result.isCorrect &&
                      isSelected && (
                        <span
                          className="
                            rounded-full
                            bg-red-500
                            px-2
                            py-1
                            text-xs
                            font-medium
                            text-white
                          "
                        >
                          Your Answer
                        </span>
                      )}
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Explanation */}

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4
        "
      >
        <h4
          className="
            text-sm
            font-semibold
            text-slate-900
          "
        >
          Explanation
        </h4>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-slate-600
          "
        >
          {result.explanation}
        </p>
      </div>
    </div>
  );
};

export default QuizReviewItem;