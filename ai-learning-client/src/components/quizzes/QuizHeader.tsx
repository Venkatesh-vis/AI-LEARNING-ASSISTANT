import { ClipboardList } from "lucide-react";

type QuizHeaderProps = {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number;
};

const QuizHeader = ({
  title,
  currentQuestion,
  totalQuestions,
  answeredQuestions,
}: QuizHeaderProps) => {
  return (
    <div
      className="
        flex
        flex-col
        gap-6
        lg:flex-row
        lg:items-start
        lg:justify-between
      "
    >
      {/* Title */}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          {title}
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          Question{" "}
          <span className="font-semibold text-slate-700">
            {currentQuestion}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {totalQuestions}
          </span>
        </p>
      </div>

      {/* Answered */}

      <div
        className="
          inline-flex
          w-fit
          items-center
          gap-3
          rounded-2xl
          border
          border-emerald-100
          bg-emerald-50
          px-5
          py-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-emerald-500
            text-white
          "
        >
          <ClipboardList size={18} />
        </div>

        <div>
          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-wide
              text-emerald-600
            "
          >
            Answered
          </p>

          <p
            className="
              text-lg
              font-bold
              text-slate-900
            "
          >
            {answeredQuestions} /{" "}
            {totalQuestions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;