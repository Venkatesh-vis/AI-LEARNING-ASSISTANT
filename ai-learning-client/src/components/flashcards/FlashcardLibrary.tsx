
import type { FlashcardSet } from "../../features/ai/aiTypes";
import FlashcardLibraryGrid from "./FlashcardLibraryGrid";

type FlashcardLibraryProps = {
  flashcardSets: FlashcardSet[];
  onDelete: (
    flashcardSet: FlashcardSet
  ) => void;
};

const FlashcardLibrary = ({
  flashcardSets,
  onDelete,
}: FlashcardLibraryProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          All Flashcard Sets
        </h1>

        <p
          className="
            mt-2
            text-slate-500
          "
        >
          Continue studying your previously generated flashcards.
        </p>
      </div>

      <FlashcardLibraryGrid
        flashcardSets={flashcardSets}
        onDelete={onDelete}
      />
    </div>
  );
};

export default FlashcardLibrary;