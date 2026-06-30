import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import ConfirmDialog from "../shared/ConfirmDialog";
import FlashcardSetCard from "./FlashCardSetCard";
import { useAppDispatch, useAppSelector, } from "../../features/hooks/reduxHooks";
import { deleteFlashcards } from "../../features/ai/aiThunk";
import type { FlashcardSet, } from "../../features/ai/aiTypes";

type FlashcardSetListProps = {
  sets: FlashcardSet[];
  onGenerate: () => void;
  deleteLoading: boolean;
  onOpenSet: (set: FlashcardSet) => void;
};

const FlashcardSetList = ({ sets, onGenerate, deleteLoading, onOpenSet }: FlashcardSetListProps) => {
  const dispatch = useAppDispatch();
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const { generateFlashcardsLoading } = useAppSelector((state) => state.flashcard);
  const handleDelete = async () => {
    if (!selectedDeleteId) return

    try {
      await dispatch(deleteFlashcards(selectedDeleteId)).unwrap();
      setSelectedDeleteId(null);
    } catch {
      //
    }
  };


  return (
    <>
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
            mb-8
            flex
            flex-col
            gap-4
            md:flex-row
            md:items-start
            md:justify-between
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-slate-900
              "
            >
              Your Flashcard Sets
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              {sets.length} set {sets.length > 1 ? "s" : ""}{" "} available
            </p>
          </div>

          <button
            onClick={onGenerate}
            disabled={generateFlashcardsLoading}
            className=" inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
          >
            {generateFlashcardsLoading ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Generating...
              </>
            ) : (
              <>
                <Plus size={16} />
                Generate New Set
              </>
            )}
          </button>
        </div>

        <div
          className="
            grid
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {sets.map(
            (set) => (
              <FlashcardSetCard
                key={set._id}
                set={set}
                onOpen={() => onOpenSet(set)}
                onDelete={() => setSelectedDeleteId(set._id)}
              />
            )
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!selectedDeleteId}
        title="Delete Flashcard Set"
        description="Are you sure you want to delete this flashcard set? This action cannot be undone."
        loading={deleteLoading}
        confirmText="Delete"
        cancelText="Cancel"
        onClose={() => setSelectedDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default FlashcardSetList;