import {CheckCircle2,XCircle,Calendar,} from "lucide-react";

type QuizSummaryProps = {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
};

const QuizSummary = ({correctAnswers,wrongAnswers,totalQuestions}: QuizSummaryProps) => {
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
      <div
        className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Stats */}

        <div
          className="
            grid
            flex-1
            gap-4
            sm:grid-cols-3
          "
        >
          {/* Correct */}

          <div
            className="
              rounded-2xl
              bg-emerald-50
              p-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                text-emerald-600
              "
            >
              <CheckCircle2
                size={20}
              />

              <span
                className="
                  text-sm
                  font-medium
                "
              >
                Correct
              </span>
            </div>

            <p
              className="
                mt-3
                text-3xl
                font-bold
                text-emerald-700
              "
            >
              {correctAnswers}
            </p>
          </div>

          {/* Wrong */}

          <div
            className="
              rounded-2xl
              bg-red-50
              p-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                text-red-600
              "
            >
              <XCircle
                size={20}
              />

              <span
                className="
                  text-sm
                  font-medium
                "
              >
                Wrong
              </span>
            </div>

            <p
              className="
                mt-3
                text-3xl
                font-bold
                text-red-700
              "
            >
              {wrongAnswers}
            </p>
          </div>

          {/* Total */}

          <div
            className="
              rounded-2xl
              bg-slate-100
              p-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                text-slate-600
              "
            >
              <Calendar
                size={20}
              />

              <span
                className="
                  text-sm
                  font-medium
                "
              >
                Total
              </span>
            </div>

            <p
              className="
                mt-3
                text-3xl
                font-bold
                text-slate-800
              "
            >
              {totalQuestions}
            </p>
          </div>
        </div>

        {/* Right */}

        <div
          className="
            flex
            flex-col
            items-start
            gap-4
            lg:items-end
          "
        >
        </div>
      </div>
    </div>
  );
};

export default QuizSummary;