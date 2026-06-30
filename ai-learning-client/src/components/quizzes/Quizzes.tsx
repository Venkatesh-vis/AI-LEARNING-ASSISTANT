import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyQuizzes from "./EmptyQuizzes";
import QuizList from "./QuizList";
import ConfirmDialog from "../shared/ConfirmDialog";
import { useAppDispatch, useAppSelector, } from "../../features/hooks/reduxHooks";
import type { Quiz } from "../../features/quiz/quizTypes";
import { deleteQuiz, generateQuiz, getQuizzes } from "../../features/quiz/quizThunk";
import GenerateQuizModal from "./GenerateQuizModal";


type QuizzesProps = {
  documentId: string;
};

const Quizzes = ({ documentId }: QuizzesProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { quizzes, getQuizzesLoading, generateQuizLoading, deleteQuizLoading } = useAppSelector((state) => state.quiz);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showGenerate, setShowGenerate] = useState(false);

  useEffect(() => {
    dispatch(getQuizzes(documentId));
  }, [dispatch, documentId]);

  const handleGenerate = async (title: string, numQuestions: number) => {
    try {
      await dispatch(generateQuiz({ documentId, title, numQuestions, })).unwrap();
      setShowGenerate(false);
    } catch {
      //
    }
  };

  const handleStartQuiz = (quizId: string) => {
    navigate(`/quizzes/${quizId}`);
  };

  const handleViewResults = (quizId: string) => {
    navigate(`/quizzes/${quizId}/results`);
  };

  const handleDeleteClick = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleDelete =
    async () => {
      if (!selectedQuiz) {
        return;
      }

      try {
        await dispatch(deleteQuiz(selectedQuiz._id)).unwrap();
        setSelectedQuiz(null);
      } catch {
        //
      }
    };

  if (getQuizzesLoading) {
    return (
      <div className=" py-20 text-center text-slate-500">
        Loading quizzes...
      </div>
    );
  }

  return (
    <>
      {quizzes.length ===
        0 ? (
        <EmptyQuizzes
          loading={generateQuizLoading}
          onGenerate={() => setShowGenerate(true)}
        />
      ) : (
        <QuizList
          quizzes={quizzes}
          loading={generateQuizLoading}
          onGenerate={() => setShowGenerate(true)}
          onStart={handleStartQuiz}
          onViewResults={handleViewResults}
          onDelete={handleDeleteClick}
        />
      )}

      <ConfirmDialog
        open={!!selectedQuiz}
        loading={deleteQuizLoading}
        title="Delete Quiz"
        description={`Are you sure you want to delete "${selectedQuiz?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onClose={() => setSelectedQuiz(null)}
        onConfirm={handleDelete}
      />

      <GenerateQuizModal
        open={showGenerate}
        loading={generateQuizLoading}
        onClose={() =>setShowGenerate(false)}
        onGenerate={handleGenerate}
      />
    </>
  );
};

export default Quizzes;