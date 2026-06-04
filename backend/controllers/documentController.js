import Document from '../models/Document.js';
import Flashcard from '../models/Flashcard.js';
import Quiz from '../models/Quiz.js';
import {extractTextFromPdf} from "../utils/pdfParser.js";
import {chunkText} from "../utils/textChunker.js"
import fs from "fs/promises";
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import mongoose, { Mongoose } from 'mongoose';


const processPdf = async (documentId, filePath) => {
    try {
        const {text} = await extractTextFromPdf(filePath);

        //create Chunks
        const chunks = chunkText(text, 500, 50);

        //upload document
        await Document.findByIdAndUpdate(documentId, {
            extractedText: text,
            chunks: chunks,
            status: "ready"
        },{ returnDocument: "after" })

        console.log(`Document ${documentId} processed successfully`);

    } catch (err) {
        console.error ("Error processing document", err)

        await Document.findByIdAndUpdate(documentId, {
            status: "failed"
        })
    }
}


export const uploadDocument = async (req, res, next) => {
    try{
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload pdf file"
            })
        }

        const {title} = req.body;

        if (!title) {
            //deleting uploaded file if no title is provided
            await fs.unlink(req.file.path).catch(() => {});
            return res.status(400).json({
                success: false,
                message: "Please provide document title"
            })
        }

        const localPath = req.file.path;
        const cloudinaryResult = await uploadToCloudinary(localPath, "documents");       

        //create document record
        const document = await Document.create({
            userId: req.user.id,
            title,
            fileName: req.file.originalname,
            filePath: cloudinaryResult.url,
            cloudinaryPublicId: cloudinaryResult.publicId,
            fileSize: req.file.size,
            status: "processing"
        })
        

        processPdf(document._id, localPath).catch((error) => {
            console.error("pdf processing error", error)
        })

        await fs.unlink(localPath).catch(() => {});

        return res.status(201).json({
            success: true,
            data: document,
            message: "Document uploaded successfully"
        })

    }
    catch(err) {
        //cleaning file on error
        if (req.file) {
            await fs.unlink(req.file.path).catch(() => {});
        }
        next(err)
    }
}


export const getDocuments = async (req, res, next) => {
    try{
        const documents = await Document.aggregate([
            {
                $match: {userId: new mongoose.Types.ObjectId(req.user.id)}
            },
            {
                $lookup: {
                    from: 'flashcards',
                    localField: "_id",
                    foreignField: "documentId",
                    as: "flashcardSets"
                }
            },
            {
                $lookup: {
                    from: "quizzes",
                    localField: "_id",
                    foreignField: "documentId",
                    as: "quizzes"
                }
            },
            {
                $addFields: {
                    flashcardCount: {$size: "$flashcardSets"},
                    quizCount:  {$size: "$quizzes"}
                }
            },
            {
                $project: {
                    extractedText: 0,
                    chunks: 0,
                    flashcardSets: 0,
                    quizzes: 0
                }
            },
            {
                $sort:{ uploadedDate: -1}
            }
        ]);
        res.status(200).json({
            success: true,
            count: documents.length,
            data: documents,
            message: "Documents fetched successfully"
        })
    }
    catch(err) {
        next(err)
    }
}

export const getDocument = async (req, res, next) => {
    try{
        const {id} = req.params

        if (!id) {
            return  res.status(400).json({
                success: false,
                message: "Document id is required"
            })
        }

        const document = await Document.findOne({
           _id:id,
           userId: req.user.id,
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found"
            })
        }

        //get count of flashcards and quizzes
        const flashcardCount = await Flashcard.countDocuments({ documentId: document._id, userId: req.user.id });
        const quizCount = await Quiz.countDocuments({ documentId: document._id, userId: req.user.id });

        document.lastAccessed = Date.now();
        await document.save();

        const documentData = document.toObject();
        documentData.flashcardCount = flashcardCount;
        documentData.quizCount = quizCount

        return res.status(200).json({
            success: true,
            message: "",
            data: documentData
        })
    }
    catch(err) {
        next(err)
    }
}

export const deleteDocument = async (req, res, next) => {
    try{
        const {id} = req.params

        if (!id) {
            return  res.status(400).json({
                success: false,
                message: "Document id is required"
            })
        }
        const document = await Document.findOne({
            _id: id,
            userId: req.user.id
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found"
            })
        }


        if (document.cloudinaryPublicId) {
            await deleteFromCloudinary(document.cloudinaryPublicId);
        }


        await Document.deleteOne({
            _id: id,
            userId: req.user.id
        });

        return res.status(200).json({
            success: true,
            message: "Document deleted successfully"
        });
    }
    catch(err) {
        next(err)
    }
}
