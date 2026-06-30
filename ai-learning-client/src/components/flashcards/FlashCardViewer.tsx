import { useEffect, useRef, useState, } from "react";
import { ArrowLeft, } from "lucide-react";
import { useAppDispatch, useAppSelector, } from "../../features/hooks/reduxHooks";
import { reviewFlashcard, toggleFlashcardStar, } from "../../features/ai/aiThunk";
import type { FlashcardSet, } from "../../features/ai/aiTypes";
import FlashcardCard from "./FlashcardCard";
import FlashcardNavigation from "./FlashcardNavigation";
import { setDashboard } from "../../features/dashboard/dashboardSlice";

type FlashcardViewerProps = {
  flashcardSet: FlashcardSet;
  setFlashcardSet: React.Dispatch<
    React.SetStateAction<FlashcardSet | null>
  >;
  onBack: () => void;
};

const FlashcardViewer = ({ flashcardSet, setFlashcardSet, onBack}: FlashcardViewerProps) => {
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { dashboard } = useAppSelector((state) => state.dashboard)
  const viewedCards = useRef(new Set<string>());
  const card = flashcardSet.cards[currentIndex];

  useEffect(() => {
    const reviewCard = async () => {
      if (!card) return;

      if (viewedCards.current.has(card._id)) {
        return;
      }

      try {
        await dispatch(reviewFlashcard(card._id)).unwrap();
        viewedCards.current.add(card._id);
        if (dashboard) {
          dispatch(
            setDashboard({
              ...dashboard,
              overview: {
                ...dashboard.overview,
                reviewedFlashCards:
                  dashboard.overview.reviewedFlashCards + 1,
              },
            })
          );
        }
      } catch {
        //
      }
    };

    reviewCard();
  }, [card, dashboard, dispatch]);

  const handlePrevious =
    () => {
      if (currentIndex > 0) {
        setFlipped(false);
        setCurrentIndex((previous) => previous - 1);
      }
    };

  const handleNext = () => {
    if (currentIndex < flashcardSet.cards.length - 1) {
      setFlipped(false);
      setCurrentIndex((previous) => previous + 1);
    }
  };

  const handleStar = async () => {
  try {
    await dispatch(toggleFlashcardStar(card._id)).unwrap();

    setFlashcardSet((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        cards: previous.cards.map((c) =>
          c._id === card._id
            ? {
                ...c,
                isStarred: !c.isStarred,
              }
            : c
        ),
      };
    });
  } catch {
    //
  }
};

  if (!card) {
    return null;
  }

  return (
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
      <button
        onClick={onBack}
        className="
          mb-8
          flex
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

      <div
        className="
          flex
          justify-center
        "
      >
        <FlashcardCard
          card={card}
          flipped={flipped}
          onFlip={() => setFlipped(!flipped)}
          onStar={handleStar}
        />
      </div>

      <FlashcardNavigation
        current={currentIndex}
        total={flashcardSet.cards.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
};

export default FlashcardViewer;