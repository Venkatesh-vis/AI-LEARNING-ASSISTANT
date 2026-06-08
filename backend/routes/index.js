import express from 'express';
import auth from "../middleware/auth.js";

const router = express.Router();
import authRoutes from "./authRoutes.js";
import documentRoutes from "./documentRoutes.js";
import flashcardRoutes from "./flashcardRoutes.js";
import quizRoutes from "./quizRoutes.js";
import aiRoutes from "./aiRoutesr.js";

router.use('/auth', authRoutes);
router.use("/document", auth, documentRoutes);
router.use("/flashcards", auth, flashcardRoutes);
router.use("/quizzes", auth, quizRoutes);
router.use("/ai", auth, aiRoutes);

export default router;