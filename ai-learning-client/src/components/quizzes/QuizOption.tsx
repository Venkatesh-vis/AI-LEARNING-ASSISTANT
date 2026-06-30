type QuizOptionProps = {
  option: string;
  selected: boolean;
  onClick: () => void;
};

const QuizOption = ({
  option,
  selected,
  onClick,
}: QuizOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        rounded-2xl
        border
        px-5
        py-4
        text-left
        transition-all
        duration-200
        cursor-pointer

        ${
          selected
            ? `
              border-emerald-500
              bg-emerald-50
              shadow-sm
            `
            : `
              border-slate-200
              bg-white
              hover:border-emerald-300
              hover:bg-emerald-50/40
            `
        }
      `}
    >
      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        {/* Radio */}

        <div
          className={`
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            border-2
            transition

            ${
              selected
                ? `
                  border-emerald-500
                `
                : `
                  border-slate-300
                `
            }
          `}
        >
          {selected && (
            <div
              className="
                h-3
                w-3
                rounded-full
                bg-emerald-500
              "
            />
          )}
        </div>

        {/* Option */}

        <span
          className={`
            flex-1
            text-base
            leading-7

            ${
              selected
                ? `
                  font-medium
                  text-slate-900
                `
                : `
                  text-slate-700
                `
            }
          `}
        >
          {option}
        </span>
      </div>
    </button>
  );
};

export default QuizOption;