import { useEffect, useState } from "react";
import EmptyFlashcards from "./EmptyFlashCards.tsx";
import FlashcardSetList from "./FlashCardSetList.tsx";
import FlashcardViewer from "./FlashCardViewer.tsx";
import {useAppDispatch,useAppSelector,} from "../../features/hooks/reduxHooks";
import {generateFlashcards,getFlashcardSets,} from "../../features/ai/aiThunk";
import { setDashboard } from "../../features/dashboard/dashboardSlice.ts";
import type { FlashcardSet } from "../../features/ai/aiTypes.ts";

type FlashcardsProps = {
  documentId: string;
};

const Flashcards = ({documentId,}: FlashcardsProps) => {
  const dispatch =useAppDispatch();
  const {flashcardSets,getFlashcardSetsLoading,getFlashcardSetLoading,generateFlashcardsLoading,deleteFlashcardsLoading,} = useAppSelector((state) => state.flashcard);
  const {dashboard} = useAppSelector((state) => state.dashboard);
  const [selectedFlashcardSet, setSelectedFlashcardSet] =useState<FlashcardSet | null>(null);
  const FLASHCARD_COUNT = 10;

  useEffect(() => {
    dispatch(
      getFlashcardSets()
    );
  }, [dispatch]);

  const documentSets = flashcardSets.filter((set) => set.documentId._id === documentId);

  
const handleGenerate = async () => {
  try {
    await dispatch(
      generateFlashcards({
        documentId,
        count: FLASHCARD_COUNT,
      })
    ).unwrap();

    if (dashboard) {
      dispatch(
        setDashboard({
          ...dashboard,
          overview: {
            ...dashboard.overview,
            totalFlashCardSets:
              dashboard.overview.totalFlashCardSets + 1,
            totalFlashCards:
              dashboard.overview.totalFlashCards +
              FLASHCARD_COUNT,
          },
        })
      );
    }
  } catch {
    //
  }
};

  if ( getFlashcardSetsLoading || getFlashcardSetLoading ) {
    return (
      <div
        className="
          flex
          items-center
          justify-center
          py-20
        "
      >
        Loading flashcards...
      </div>
    );
  }

  if (selectedFlashcardSet) {
    return (
      <FlashcardViewer
        flashcardSet={selectedFlashcardSet}
        setFlashcardSet={setSelectedFlashcardSet}
        onBack={() => setSelectedFlashcardSet(null)}
      />
    );
  }

  return (
    <>
      {documentSets.length ===
      0 ? (
        <EmptyFlashcards
          loading={
            generateFlashcardsLoading
          }
          onGenerate={
            handleGenerate
          }
        />
      ) : (
        <FlashcardSetList
          sets={documentSets}
          onGenerate={handleGenerate}
          onOpenSet={setSelectedFlashcardSet}
          deleteLoading={deleteFlashcardsLoading}
        />
      )}
    </>
  );
};

export default Flashcards;