import express from 'express';
import auth from "../middleware/auth.js";

const router = express.Router();
import authRoutes from "./authRoutes.js";
import documentRoutes from "./documentRoutes.js";
import flashcardRoutes from "./flashCardRoutes.js";
import quizRoutes from "./quizRoutes.js";
import aiRoutes from "./aiRoutes.js";
import progressRoutes from "./progressRoutes.js";

router.use('/auth', authRoutes);
router.use("/document", auth, documentRoutes);
router.use("/flashcards", auth, flashcardRoutes);
router.use("/quizzes", auth, quizRoutes);
router.use("/progress", auth, progressRoutes);
router.use("/ai", auth, aiRoutes);

export default router;