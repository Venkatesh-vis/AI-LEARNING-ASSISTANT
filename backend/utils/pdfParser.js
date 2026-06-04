import fs from "fs/promises";
import { PDFParse } from "pdf-parse";


export const extractTextFromPdf = async (filePath) => {
    try {
        const databuffer = await fs.readFile(filePath);
        //pdf-parser expects a unit8Array, not buffer
        const parser = new PDFParse(new Uint8Array(databuffer));
        const data = await parser.getText();

        return {
            text: data.text,
            numPages: data.numPages,
            info: data.info
        }

    }
    catch (err) {
        console.error("pdf parsing error", err);
        throw new Error("Failed to extract text from pdf");
    }
}