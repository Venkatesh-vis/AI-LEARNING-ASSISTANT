import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../features/hooks/reduxHooks";
import type { FlashcardSet } from "../../features/ai/aiTypes";
import FlashcardViewer from "../../components/flashcards/FlashCardViewer";

export default function FlashCardPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { flashcardSets } =
    useAppSelector(
      (state) =>
        state.flashcard
    );

  const selectedFlashcardSet =
    useMemo(
      () =>
        flashcardSets.find(
          (set) =>
            set._id === id
        ) ?? null,
      [
        flashcardSets,
        id,
      ]
    );

  const [
    flashcardSet,
    setFlashcardSet,
  ] = useState<FlashcardSet | null>(
    selectedFlashcardSet
  );

  useEffect(() => {
    setFlashcardSet(
      selectedFlashcardSet
    );
  }, [selectedFlashcardSet]);

  if (!flashcardSet) {
    return (
      <div
        className="
          py-20
          text-center
        "
      >
        <button
          onClick={() =>
            navigate(
              "/flashcards"
            )
          }
          className="
            inline-flex
            items-center
            gap-2
            text-slate-500
            hover:text-slate-700
            cursor-pointer
          "
        >
          <ArrowLeft size={16} />
          Back to Sets
        </button>

        <h2
          className="
            mt-8
            text-2xl
            font-bold
            text-slate-900
          "
        >
          Flashcard Set Not
          Found
        </h2>

        <p
          className="
            mt-2
            text-slate-500
          "
        >
          The requested
          flashcard set
          could not be
          found.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        space-y-8
      "
    >
      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          {
            flashcardSet
              .documentId.title
          }
        </h1>
      </div>

      <FlashcardViewer
        flashcardSet={
          flashcardSet
        }
        setFlashcardSet={
          setFlashcardSet
        }
        onBack={() =>
          navigate(
            "/flashcards"
          )
        }
      />
    </div>
  );
}