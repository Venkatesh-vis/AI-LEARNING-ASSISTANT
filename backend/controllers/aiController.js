import Document from "../models/Document.js";
import FlashCard from "../models/FlashCard.js";
import Quiz from "../models/Quiz.js";
import ChatHistory from "../models/ChatHistory.js";
import {generatingFlashcards, generatingQuiz, generatingSummary, chatWithContext, explainingConcept} from "../utils/geminiService.js"
import {findRelevantChunks} from "../utils/textChunker.js"


export const generateFlashCards = async(req, res, next) => {
    try {
        const {documentId, count = 10} = req.body;

        if (!documentId) {
            return res.status(400).json({
                success: false,
                message: "Please provide documentId"
            })
        }

        const document = await Document.findOne({
            _id: documentId,
            userId: req.user.id,
            status: "ready"
        })

        if (!document) {
            return res.status(400).json({
                success: false,
                message: "Document not found or not ready"
            })
        }

        //Generate flashcard using gemini
        const cards = await generatingFlashcards(
            document.extractedText,
            parseInt(count)
        )

        const flashCardSet = await FlashCard.create({
            userId: req.user.id,
            documentId: document._id,
            cards: cards.map((card) => {
                return {
                    question :card.question,
                    answer: card.answer,
                    difficulty: card.difficulty,
                    reviewCount: 0,
                    isStarred: false
                }
            })
        })

        return res.status(200).json({
            success: true,
            data: flashCardSet,
            message: "FlashCards generated successfully"
        })
    }
    catch (err) {
        next(err)
    }
}

export const generateQuiz = async(req, res, next) => {
    try {
        const {documentId, numQuestions = 5, title} = req.body;

        if(!documentId) {
            return res.status(400).json({
                success: false,
                message: "Please provide documentId"
            })
        }

        const document =  await Document.findOne({_id: documentId, userId: req.user.id, status: "ready"});

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "No document found or not ready"
            })
        }

        //Generating Quiz using gemini
        const questions = await generatingQuiz(document.extractedText, parseInt(numQuestions));

        const quiz = await Quiz.create({
            userId: req.user.id,
            documentId: document._id,
            title: title || `${document.title} - Quiz`,
            questions,
            totalQuestions: questions.length,
            userAnswers: [],
            score: 0
        })

        return res.status(200).json({
            success: true,
            message: "Quiz generated successfully",
            data: quiz
        })
    }
    catch (err) {
        next(err)
    }
}

export const generateSummary = async(req, res, next) => {
    try {
        const {documentId} = req.body;

        if (!documentId) {
            return res.status(400).json({
                success: false,
                message: "Please provise documentId"
            })
        }

        const document = await Document.findOne({_id: documentId, userId: req.user.id});

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found or not ready"
            })
        }

        const summary = await generatingSummary(document.extractedText);

        return res.status(200).json({
            success: true,
            data: {
                documentId: document._id,
                title: document.title,
                summary
            },
            message: "Summary generated successfully",
        });

    }
    catch (err) {
        next(err)
    }
}

export const chat = async(req, res, next) => {
    try {
        const {documentId, question} = req.body;

        if (!documentId || !question) {
            return res.status(400).json({
                success: false,
                message: "Please provide documentId and question"
            });
        }

        const document = await Document.findOne({_id: documentId, userId: req.user.id});

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found or not ready"
            })
        }

        //find relevant chunks
        const relevantChunks = findRelevantChunks(document.chunks, question, 3);
        const chunkIndices = relevantChunks.map(c => c.chunkIndex);

        //get or create chat history

        let chatHistory = await ChatHistory.findOne({
            userId: req.user.id,
            documentId: document._id
        })

        if (!chatHistory) {
            chatHistory = await ChatHistory.create({
                userId: req.user.id,
                documentId: document._id,
                messages: []
            })
        }

        const answer = await chatWithContext(question, relevantChunks);

        chatHistory.messages.push(
            {
            role: "user",
            content: question,
            timestamp: new Date(),
            relevantChunks: []
        },
        {
            role: "assistant",
            content: answer,
            relevantChunks: chunkIndices
        }
    );

    await chatHistory.save();

    return res.status(200).json({
        success: true,
        data: {
            question,
            answer,
            relevantChunks: chunkIndices,
            chatHistory: chatHistory._id
        },
        message: "Response generated successfully"
    })

    }
    catch (err) {
        next(err)
    }
}

export const explainConcept = async(req, res, next) => {
    try {
        const {documentId, concept} = req.body;
         
        if (!documentId || !concept) {
            return res.status(400).json({
                success: false,
                message: "Please provide documentId and concept"
            })
        }

        const document = await Document.findOne({_id: documentId, userId: req.user.id, status: "ready"});

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found or not ready"
            })
        }

        const relevantChunks = findRelevantChunks(document.chunks, concept, 3);
        const context = relevantChunks.map(c => c.content).join("\n\n");

        const explanation = await explainingConcept(concept, context);

        return res.status(200).json({
            success: true,
            data: {
                concept, 
                explanation,
                relevantChunks: relevantChunks.map(c => c.chunkIndex)
            },
            message: "Explanation generated successfully"
        })
    }
    catch (err) {
        next(err)
    }
}

export const getChatHistory = async(req, res, next) => {
    try {
        const {documentId} = req.body;

        if (!documentId) {
            return res.status(400).json({
                success: false,
                message: "Please provide documentId"
            })
        }

        const chatHistory = await ChatHistory.findOne({
            userId: req.user.id,
            documentId: documentId
        })

        if (!chatHistory) {
            return res.status(404).json({
                success: false,
                message: "No chat history found for this document"
            })
        }

        return res.status(200).json({
            success: true,
            data: chatHistory.messages,
            message:"Chat history retrieved successfully"
        })


    }
    catch (err) {
        next(err)
    }
}