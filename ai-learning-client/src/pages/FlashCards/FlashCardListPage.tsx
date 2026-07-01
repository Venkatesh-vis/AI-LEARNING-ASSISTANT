import { useEffect, useState } from "react";
import Spinner from "../../components/shared/Spinner";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import { useAppDispatch, useAppSelector } from "../../features/hooks/reduxHooks";
import {
  deleteFlashcards,
  getFlashcardSets,
} from "../../features/ai/aiThunk";
import type { FlashcardSet } from "../../features/ai/aiTypes";
import EmptyFlashcardLibrary from "../../components/flashcards/EmptyFlashcardLibrary";
import FlashcardLibrary from "../../components/flashcards/FlashcardLibrary";


export default function FlashCardListPage() {
  const dispatch = useAppDispatch();

  const {
    flashcardSets,
    getFlashcardSetsLoading,
    deleteFlashcardsLoading,
    error,
  } = useAppSelector(
    (state) => state.flashcard
  );

  const [
    selectedSet,
    setSelectedSet,
  ] = useState<FlashcardSet | null>(
    null
  );

  useEffect(() => {
    dispatch(getFlashcardSets());
  }, [dispatch]);

  const handleDelete =
    async () => {
      if (!selectedSet) {
        return;
      }

      try {
        await dispatch(
          deleteFlashcards(
            selectedSet._id
          )
        ).unwrap();

        setSelectedSet(
          null
        );
      } catch {
        //
      }
    };

  if (
    getFlashcardSetsLoading
  ) {
    return (
      <div className="py-20">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-200
          bg-red-50
          p-6
          text-red-600
        "
      >
        {error}
      </div>
    );
  }

  return (
    <>
      {flashcardSets.length ===
      0 ? (
        <EmptyFlashcardLibrary />
      ) : (
        <FlashcardLibrary
          flashcardSets={
            flashcardSets
          }
          onDelete={
            setSelectedSet
          }
        />
      )}

      <ConfirmDialog
        open={
          !!selectedSet
        }
        loading={
          deleteFlashcardsLoading
        }
        title="Delete Flashcard Set"
        description={`Are you sure you want to delete "${selectedSet?.documentId.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onClose={() =>
          setSelectedSet(
            null
          )
        }
        onConfirm={
          handleDelete
        }
      />
    </>
  );
}