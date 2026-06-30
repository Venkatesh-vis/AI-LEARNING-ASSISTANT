import { Brain } from "lucide-react";

type EmptyFlashcardsProps =
  {
    onGenerate: () => void;
    loading?: boolean;
  };

const EmptyFlashcards = ({
  onGenerate,
  loading = false,
}: EmptyFlashcardsProps) => {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        px-8
        py-20
        shadow-sm
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-md
          flex-col
          items-center
          text-center
        "
      >
        <div
          className="
            mb-6
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-emerald-100
            text-emerald-600
          "
        >
          <Brain
            size={30}
          />
        </div>

        <h2
          className="
            text-2xl
            font-bold
            text-slate-900
          "
        >
          No Flashcards Yet
        </h2>

        <p
          className="
            mt-3
            text-sm
            leading-relaxed
            text-slate-500
          "
        >
          Generate flashcards
          from your document
          to start learning and
          reinforce your
          knowledge.
        </p>

        <button
          onClick={
            onGenerate
          }
          disabled={loading}
          className="
            mt-8
            inline-flex
            items-center
            justify-center
            rounded-xl
            bg-emerald-500
            px-6
            py-3
            text-sm
            font-medium
            text-white
            shadow-lg
            shadow-emerald-500/20
            transition
            hover:bg-emerald-600
            disabled:cursor-not-allowed
            disabled:opacity-60
            cursor-pointer
          "
        >
          {loading
            ? "Generating..."
            : "Generate Flashcards"}
        </button>
      </div>
    </div>
  );
};

export default EmptyFlashcards;