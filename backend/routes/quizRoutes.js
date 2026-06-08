import express from 'express';
const router = express.Router();
import {getQuizzes, getQuizById, submitQuiz, getQuizResults, deleteQuiz} from "../controllers/quizController.js";


router.get("/:documentId", getQuizzes);
router.get("/quiz/:id", getQuizById);
router.post("/:id/submit", submitQuiz);
router.get("/:id/results", getQuizResults);
router.delete("/:id", deleteQuiz);

export default router;