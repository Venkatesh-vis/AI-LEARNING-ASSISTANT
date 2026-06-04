import express from 'express';
import auth from "../middleware/auth.js";

const router = express.Router();
import authRoutes from "../routes/authRoutes.js";
import documentRoutes from "../routes/documentRoutes.js";

router.use('/auth', authRoutes);
router.use("/document", auth, documentRoutes);

export default router;