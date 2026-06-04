import express from 'express';
import {deleteDocument,getDocument, getDocuments, updateDocument,uploadDocument} from "../controllers/documentController.js";
import upload from "../config/multer.js";
const router =  express.Router();

router.post("/upload", upload.single("file"), uploadDocument);
router.get("/", getDocuments);
router.get("/:id", getDocument);
router.delete("/:id", deleteDocument);
router.put("/:id", updateDocument);

export default router;