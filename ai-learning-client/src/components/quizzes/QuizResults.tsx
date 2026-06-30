import QuizScoreCard from "./QuizScoreCard";
import QuizSummary from "./QuizSummary";
import QuizReviewItem from "./QuizReviewItem";
import type {QuizResultsResponse} from "../../features/quiz/quizTypes";

type QuizResultsProps = {
  results: QuizResultsResponse;
  onBack: () => void;
};

const QuizResults = ({results,onBack}: QuizResultsProps) => {
  const {quiz,results: reviewItems} = results;
  const correctAnswers = reviewItems.filter((item) => item.isCorrect).length;
  const wrongAnswers = reviewItems.length - correctAnswers;

  return (
    <div className="space-y-8">
      <QuizScoreCard
        title={quiz.title}
        percentage={quiz.score}
        score={correctAnswers}
        totalQuestions={quiz.totalQuestions}
        completedAt={quiz.completedAt}
        onBack={onBack}
      />

      <QuizSummary
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
        totalQuestions={quiz.totalQuestions}
      />

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
        <h2
          className="
            text-xl
            font-bold
            text-slate-900
          "
        >
          Question Review
        </h2>

        <div className="mt-6 space-y-6">
          {reviewItems.map(
            (result) => (
              <QuizReviewItem
                key={result.questionIndex}
                result={result}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizResults;