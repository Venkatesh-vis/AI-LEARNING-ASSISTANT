import Document from "../models/Document.js";
import FlashCard from "../models/FlashCard.js";
import Quiz from "../models/Quiz.js";


export const getDashboard = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const totalDocuments = await Document.countDocuments({userId});
        const totalFlashCardSets = await FlashCard.countDocuments({userId})
        const totalQuizzes = await Quiz.countDocuments({userId});
        const completedQuizzes = await Quiz.countDocuments({userId, completedAt: {$ne: null}});

        const flashCardSets = await FlashCard.find({userId});
        let totalFlashCards = 0;
        let reviewedFlashCards = 0;
        let starredFlashCards = 0;

        flashCardSets.forEach(set => {
            totalFlashCards += set.cards.length
            reviewedFlashCards += set.cards.filter(c => c.reviewCount > 0).length;
            starredFlashCards += set.cards.filter(c => c.isStarred).length;
        })

        const quizzes = await Quiz.find({userId, completedAt: {$ne: null}});
        const averageScore = quizzes.length > 0 ? Math.round(quizzes.reduce((sum, q) => sum + q.score, 0) / quizzes.length) : 0;

        const recentDocuments = await Document.find({userId})
              .sort({lastAccessed: -1})  
              .limit(5)
              .select("title fileName lastAccessed status");

        
        const recentQuizzes = await Quiz.find({userId})
              .sort({createdAt: -1})  
              .limit(5)
              .populate("documentId", "title")
              .select("title score totalQuestions completedAt")


        return res.status(200).json({
            success: true,
            data: {
                overview: {
                    totalDocuments,
                    totalFlashCardSets,
                    totalFlashCards,
                    reviewedFlashCards,
                    starredFlashCards,
                    averageScore,
                    totalQuizzes,
                    completedQuizzes,
                },
                recentActivity: {
                    documents: recentDocuments,
                    quizzes: recentQuizzes,
                }
            },
            message: "successfully fetched dashboard stats"
        })
    }
    catch (err) {
        next(err)
    }
}