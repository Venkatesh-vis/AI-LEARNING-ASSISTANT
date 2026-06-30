import { useEffect } from "react";
import {useNavigate,useParams,} from "react-router-dom";
import Spinner from "../../components/shared/Spinner";
import {useAppDispatch,useAppSelector,} from "../../features/hooks/reduxHooks";
import { getQuizResults } from "../../features/quiz/quizThunk";
import QuizResults from "../../components/quizzes/QuizResults";

const QuizResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {quizResults,getQuizResultsLoading,error} = useAppSelector((state) => state.quiz);

  useEffect(() => {
    if (id) {
      dispatch(getQuizResults(id));
    }
  }, [dispatch, id]);

  if (getQuizResultsLoading) {
    return (
      <div
        className="
          py-20
        "
      >
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-xl
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

  

  if (!quizResults) {
    return (
      <div
        className="
          py-20
          text-center
          text-slate-500
        "
      >
        Quiz results not found.
      </div>
    );
  }



  return (
    <QuizResults
      results={quizResults}
      onBack={() =>
        navigate(-1)
      }
    />
  );
};

export default QuizResultPage;