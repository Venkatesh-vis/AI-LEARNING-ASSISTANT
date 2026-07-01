import {
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyFlashcardLibrary = () => {
  const navigate =
    useNavigate();

  return (
    <div
      className="
        rounded-3xl
        border
        border-dashed
        border-slate-300
        bg-white
        px-8
        py-20
        text-center
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-3xl
          bg-emerald-100
        "
      >
        <BookOpen
          size={38}
          className="text-emerald-600"
        />
      </div>

      <h2
        className="
          mt-8
          text-2xl
          font-bold
          text-slate-900
        "
      >
        No Flashcard Sets Yet
      </h2>

      <p
        className="
          mx-auto
          mt-3
          max-w-md
          text-slate-500
        "
      >
        Generate flashcards from any
        document to build your study
        library.
      </p>

      <button
        onClick={() =>
          navigate("/documents")
        }
        className="
          mt-8
          rounded-xl
          bg-emerald-500
          px-6
          py-3
          font-medium
          text-white
          transition
          hover:bg-emerald-600
          cursor-pointer
        "
      >
        Browse Documents
      </button>
    </div>
  );
};

export default EmptyFlashcardLibrary;