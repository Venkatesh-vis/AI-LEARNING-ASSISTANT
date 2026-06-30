import { Award, CheckCircle2, ArrowLeft, CalendarDays, } from "lucide-react";

type QuizScoreCardProps = {
  title: string;
  score: number;
  percentage: number;
  totalQuestions: number;
  completedAt: string | null;
  onBack: () => void;
};

const QuizScoreCard = ({ title, score, percentage, totalQuestions, completedAt, onBack, }: QuizScoreCardProps) => {

  const getScoreColor = () => {
    if (percentage >= 80) {
      return "text-emerald-600";
    }

    if (percentage >= 60) {
      return "text-amber-500";
    }

    return "text-red-500";
  };

  const getBadgeColor = () => {
    if (percentage >= 80) {
      return "bg-emerald-100 text-emerald-700";
    }

    if (percentage >= 60) {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-6">
      {/* Back */}

      <button
        onClick={onBack}
        className="
          flex
          items-center
          gap-2
          text-slate-500
          hover:text-slate-700
          transition
          cursor-pointer
        "
      >
        <ArrowLeft size={16} />
        Back to Quizzes
      </button>

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
        <div
          className="
            flex
            flex-col
            gap-10
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Left */}

          <div className="flex-1">
            <div
              className={`
                inline-flex
                items-center
                gap-2
                rounded-full
                px-4
                py-2
                text-sm
                font-semibold
                ${getBadgeColor()}
              `}
            >
              <Award size={16} />
              Quiz Completed
            </div>

            <h1
              className="
                mt-5
                text-3xl
                font-bold
                text-slate-900
              "
            >
              {title}
            </h1>

            <p
              className="
                mt-3
                text-slate-500
              "
            >
              You answered{" "}
              <span className="font-semibold text-slate-800">
                {score}
              </span>{" "}
              out of{" "}
              <span className="font-semibold text-slate-800">
                {totalQuestions}
              </span>{" "}
              questions correctly.
            </p>


            {completedAt && (
              <div
                className=" mt-6 inline-flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3">
                <CalendarDays
                  size={18}
                  className="text-slate-500"
                />

                <div>
                  <p className="text-xs text-slate-500">
                    Completed on
                  </p>

                  <p className="text-sm font-medium text-slate-900">
                    {new Date(completedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right */}

          <div className=" flex min-w-[220px] flex-col items-center justify-center rounded-3xl bg-slate-50 px-10 py-10">
            {(() => {
              const radius = 48;
              const circumference = 2 * Math.PI * radius;
              const offset = circumference - (percentage / 100) * circumference;
              return (
                <>
                  <div className=" relative h-36 w-36">
                    <svg className=" h-36 w-36 -rotate-90">
                      <circle cx="72" cy="72" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="10"/>
                      <circle cx="72" cy="72" r={radius} fill="none" stroke={ percentage >= 80  ? "#10B981" : percentage >= 60  ? "#F59E0B"  : "#EF4444" } strokeWidth="10" strokeLinecap="round" strokeDasharray={ circumference } strokeDashoffset={ offset } className="transition-all duration-700"/>
                    </svg>
                    <div className=" absolute inset-0 flex flex-col items-center justify-center">
                      <div className={`text-4xl font-extrabold${getScoreColor()}`}>{percentage}%</div>
                    </div>
                  </div>
                  <div className=" mt-6 flex items-center gap-2 text-slate-600">
                    <CheckCircle2 size={18}/>
                    Final Score
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScoreCard;