import express from 'express';
const router = express.Router();
import {generateFlashCards, generateQuiz, generateSummary, chat, explainConcept, getChatHistory} from "../controllers/aiController.js";

router.post("/generate-flashcards", generateFlashCards);
router.post("/generate-quiz", generateQuiz);
router.post("/generate-summary", generateSummary);
router.post("/chat", chat);
router.post("/explain-concept", explainConcept);
router.get("/chat-history/:documentId", getChatHistory);


export default router;