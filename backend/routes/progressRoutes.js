import express from 'express';
const router = express.Router();
import {getDashboard} from "../controllers/progressController.js";

router.get('/', getDashboard);

export default router;