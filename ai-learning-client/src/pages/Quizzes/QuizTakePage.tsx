import { useEffect } from "react";
import {ArrowLeft,} from "lucide-react";
import {useNavigate,useParams,} from "react-router-dom";
import Spinner from "../../components/shared/Spinner";
import {useAppDispatch,useAppSelector,} from "../../features/hooks/reduxHooks";
import {getQuiz,submitQuiz,} from "../../features/quiz/quizThunk";
import type {SubmitQuizAnswer,} from "../../features/quiz/quizTypes";
import QuizPlayer from "../../components/quizzes/QuizPlayer";

const QuizTakePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {quiz,getQuizLoading,submitQuizLoading,error} = useAppSelector((state) => state.quiz);

  useEffect(() => {
    if (id) {
      dispatch(getQuiz(id));
    }
  }, [dispatch, id]);

  const handleSubmit = async (answers: SubmitQuizAnswer[]) => {
      if (!id) {
        return;
      }

      try {
        await dispatch(
          submitQuiz({
            quizId: id,
            answers,
          })
        ).unwrap();

        navigate(
          `/quizzes/${id}/results`
        );
      } catch {
        //
      }
    };

  if (getQuizLoading) {
    return (
      <div className="py-20">
        <Spinner />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div
        className="
          py-20
          text-center
          text-slate-500
        "
      >
        {error ??
          "Quiz not found."}
      </div>
    );
  }

  return (
    <div
      className="
        mx-auto
        max-w-5xl
        space-y-8
      "
    >
      {/* Back */}

      <button
        onClick={() =>
          navigate(-1)
        }
        className="
          flex
          items-center
          gap-2
          text-slate-500
          hover:text-slate-700
          cursor-pointer
        "
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <QuizPlayer
        quiz={quiz}
        loading={
          submitQuizLoading
        }
        onBack={() =>
          navigate(-1)
        }
        onSubmit={
          handleSubmit
        }
      />
    </div>
  );
};

export default QuizTakePage;