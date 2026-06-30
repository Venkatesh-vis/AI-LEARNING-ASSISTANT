import { useEffect, useState } from "react";

type GenerateQuizModalProps = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onGenerate: (title: string,questionCount: number) => void;
};

const MAX_QUESTIONS = 10;

const GenerateQuizModal = ({open,loading,onClose,onGenerate,}: GenerateQuizModalProps) => {
  const [title, setTitle] = useState("");
  const [questionCount,setQuestionCount,] = useState(10);
  const [titleError,setTitleError] = useState("");
  const [questionError,setQuestionError] = useState("");

  useEffect(() => {
    if (!open) {
      setTitle("");
      setQuestionCount(10);
      setTitleError("");
      setQuestionError("");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const handleGenerate = () => {
    let valid = true;

    if (!title.trim()) {
      setTitleError(
        "Title is required."
      );
      valid = false;
    } else {
      setTitleError("");
    }

    if (
      questionCount < 1 ||
      questionCount >
        MAX_QUESTIONS
    ) {
      setQuestionError(
        `Question count must be between 1 and ${MAX_QUESTIONS}.`
      );
      valid = false;
    } else {
      setQuestionError("");
    }

    if (!valid) {
      return;
    }

    onGenerate(
      title.trim(),
      questionCount
    );
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          p-6
          shadow-xl
        "
      >
        <h2
          className="
            text-xl
            font-bold
            text-slate-900
          "
        >
          Generate Quiz
        </h2>

        {/* Title */}

        <div className="mt-6">
          <label
            className="
              text-sm
              font-medium
              text-slate-700
            "
          >
            Title
          </label>

          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-emerald-500
            "
            placeholder="Quiz title"
          />

          {titleError && (
            <p
              className="
                mt-1
                text-sm
                text-red-500
              "
            >
              {titleError}
            </p>
          )}
        </div>

        {/* Questions */}

        <div className="mt-5">
          <label
            className="
              text-sm
              font-medium
              text-slate-700
            "
          >
            Number of Questions
          </label>

          <input
            type="number"
            min={1}
            max={
              MAX_QUESTIONS
            }
            value={
              questionCount
            }
            onChange={(e) =>
              setQuestionCount(
                Number(
                  e.target.value
                )
              )
            }
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-emerald-500
            "
          />

          {questionError && (
            <p
              className="
                mt-1
                text-sm
                text-red-500
              "
            >
              {questionError}
            </p>
          )}
        </div>

        {/* Actions */}

        <div
          className="
            mt-8
            flex
            justify-end
            gap-3
          "
        >
          <button
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              border
              border-slate-300
              px-5
              py-2.5
              font-medium
              text-slate-700
              hover:bg-slate-50
              cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            onClick={
              handleGenerate
            }
            disabled={loading}
            className="
              rounded-xl
              bg-emerald-500
              px-5
              py-2.5
              font-medium
              text-white
              hover:bg-emerald-600
              cursor-pointer
            "
          >
            {loading
              ? "Generating..."
              : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateQuizModal;