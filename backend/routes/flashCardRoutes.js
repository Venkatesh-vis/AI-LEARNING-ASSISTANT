import express from 'express';
const router = express.Router();
import {getFlashCards, getAllFlashCardSets, reviewFlashCard, toggleStartFlashCard, deleteFlashCardSet} from "../controllers/flashCardController.js";


router.get("/", getAllFlashCardSets);
router.get("/:id/:setId", getFlashCards);
router.post("/:cardId/review", reviewFlashCard);
router.put("/:cardId/star", toggleStartFlashCard);
router.delete("/:id", deleteFlashCardSet);

export default router;