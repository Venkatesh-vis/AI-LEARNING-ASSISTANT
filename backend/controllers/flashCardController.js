import FlashCard from "../models/FlashCard.js";

export const getFlashCards = async (req, res, next) => {
  try {
    const { id, setId } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "PLease provide Id",
      });
    }

    const flashCards = await FlashCard.findOne({
      userId: req.user.id,
      documentId: id,
      _id: setId,
    })
      .populate("documentId", "title fileName")
      .sort({ createdAt: -1 });

    if (!flashCards) {
      return res.status(404).json({
        success: false,
        message: "FlashCard set not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "flashCards fetched successfully",
      count: flashCards?.cards?.length || 0,
      data: flashCards,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllFlashCardSets = async (req, res, next) => {
  try {
    const flashCardSets = await FlashCard.find({ userId: req.user.id })
      .populate("documentId", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "flashCardSets fetched successfully",
      data: flashCardSets,
    });
  } catch (err) {
    next(err);
  }
};

export const reviewFlashCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    if (!cardId) {
      return res.status(400).json({
        success: false,
        message: "Please provide Id",
      });
    }
    const flashCardSet = await FlashCard.findOne({
      "cards._id": cardId,
      userId: req.user.id,
    });

    if (!flashCardSet) {
      return res.status(404).json({
        success: false,
        message: "flashCard set not found",
      });
    }

    const cardIndex = flashCardSet.cards.findIndex(
      (card) => card._id.toString() === cardId,
    );

    if (cardIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Card not found in set",
      });
    }

    flashCardSet.cards[cardIndex].lastReviewed = new Date();
    flashCardSet.cards[cardIndex].reviewCount += 1;

    await flashCardSet.save();

    return res.status(200).json({
      success: true,
      message: "FlashCard reviewed successfully",
      data: flashCardSet,
    });
  } catch (err) {
    next(err);
  }
};

export const toggleStartFlashCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    if (!cardId) {
      return res.status(400).json({
        success: false,
        message: "PLease provide card id",
      });
    }
    const flashCardSet = await FlashCard.findOne({
      "cards._id": cardId,
      userId: req.user.id,
    });
    if (!flashCardSet) {
      return res.status(404).json({
        success: false,
        message: "flashCard not found",
      });
    }
    const cardIndex = flashCardSet.cards.findIndex(
      (card) => card._id.toString() === cardId,
    );
    if (cardIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Card not found in set",
      });
    }
    flashCardSet.cards[cardIndex].isStarred =
      !flashCardSet.cards[cardIndex].isStarred;
    await flashCardSet.save();

    return res.status(200).json({
      success: true,
      message: `FlashCard ${flashCardSet.cards[cardIndex].isStarred ? "starred" : "unstarred"}`,
      data: flashCardSet,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteFlashCardSet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const flashCardSet = await FlashCard.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!flashCardSet) {
      return res.status(404).json({
        success: false,
        message: "FlashCard Set not found",
      });
    }

    await flashCardSet.deleteOne();

    return res.status(200).json({
      success: true,
      message: "FlashCard set deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
