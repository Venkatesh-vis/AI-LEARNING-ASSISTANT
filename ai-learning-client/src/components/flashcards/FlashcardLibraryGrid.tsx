
import type { FlashcardSet } from "../../features/ai/aiTypes";
import FlashcardLibraryCard from "./FlashcardLibraryCard";

type FlashcardLibraryGridProps = {
  flashcardSets: FlashcardSet[];
  onDelete: (
    flashcardSet: FlashcardSet
  ) => void;
};

const FlashcardLibraryGrid = ({
  flashcardSets,
  onDelete,
}: FlashcardLibraryGridProps) => {
  return (
    <div
      className="
        grid
        gap-6
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
      {flashcardSets.map(
        (flashcardSet) => (
          <FlashcardLibraryCard
            key={flashcardSet._id}
            flashcardSet={
              flashcardSet
            }
            onDelete={() =>
              onDelete(
                flashcardSet
              )
            }
          />
        )
      )}
    </div>
  );
};

export default FlashcardLibraryGrid;