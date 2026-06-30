type QuizProgressProps = {
  progress: number;
};

const QuizProgress = ({
  progress,
}: QuizProgressProps) => {
  return (
    <div className="mt-8">
      {/* Header */}

      <div
        className="
          mb-3
          flex
          items-center
          justify-between
        "
      >
        <h3
          className="
            text-sm
            font-medium
            text-slate-600
          "
        >
          Progress
        </h3>

        <span
          className="
            text-sm
            font-semibold
            text-emerald-600
          "
        >
          {progress}%
        </span>
      </div>

      {/* Progress Bar */}

      <div
        className="
          h-3
          overflow-hidden
          rounded-full
          bg-slate-200
        "
      >
        <div
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-emerald-500
            to-emerald-400
            transition-all
            duration-300
          "
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;