import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import QuizHeader from "./QuizHeader";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import QuizPagination from "./QuizPagination";
import type { Quiz } from "../../features/quiz/quizTypes";
import type { SubmitQuizAnswer } from "../../features/quiz/quizTypes";

type QuizPlayerProps = {
  quiz: Quiz;
  loading: boolean;

  onBack: () => void;

  onSubmit: (
    answers: SubmitQuizAnswer[]
  ) => void;
};

const QuizPlayer = ({
  quiz,
  loading,
  onBack,
  onSubmit,
}: QuizPlayerProps) => {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [
    selectedAnswers,
    setSelectedAnswers,
  ] = useState<
    Record<number, string>
  >({});

  const currentQuestion =
    quiz.questions[currentIndex];

  const answeredQuestions =
    Object.keys(selectedAnswers)
      .length;

  const progress = useMemo(
    () =>
      Math.round(
        ((currentIndex + 1) /
          quiz.questions.length) *
          100
      ),
    [
      currentIndex,
      quiz.questions.length,
    ]
  );

  const handleSelectAnswer = (
    answer: string
  ) => {
    setSelectedAnswers(
      (previous) => ({
        ...previous,
        [currentIndex]:
          answer,
      })
    );
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(
        (previous) =>
          previous - 1
      );
    }
  };

  const handleNext = () => {
    if (
      currentIndex <
      quiz.questions.length - 1
    ) {
      setCurrentIndex(
        (previous) =>
          previous + 1
      );
    }
  };

  const handleSubmit = () => {
    const answers: SubmitQuizAnswer[] =
      Object.entries(
        selectedAnswers
      ).map(
        ([
          questionIndex,
          selectedAnswer,
        ]) => ({
          questionIndex:
            Number(
              questionIndex
            ),
          selectedAnswer,
        })
      );

    onSubmit(answers);
  };

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
      {/* Back */}

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
        Back to Quizzes
      </button>

      {/* Header */}

      <QuizHeader
        title={quiz.title}
        currentQuestion={
          currentIndex + 1
        }
        totalQuestions={
          quiz.questions.length
        }
        answeredQuestions={
          answeredQuestions
        }
      />

      {/* Progress */}

      <QuizProgress
        progress={progress}
      />

      {/* Question */}

      <div className="mt-8">
        <QuizQuestion
          question={
            currentQuestion
          }
          selectedAnswer={
            selectedAnswers[
              currentIndex
            ]
          }
          onSelect={
            handleSelectAnswer
          }
        />
      </div>

      {/* Pagination */}

      <div className="mt-10">
        <QuizPagination
          current={
            currentIndex
          }
          total={
            quiz.questions.length
          }
          canSubmit={
            answeredQuestions ===
            quiz.questions.length
          }
          loading={loading}
          onPrevious={
            handlePrevious
          }
          onNext={
            handleNext
          }
          onSubmit={
            handleSubmit
          }
        />
      </div>
    </div>
  );
};

export default QuizPlayer;