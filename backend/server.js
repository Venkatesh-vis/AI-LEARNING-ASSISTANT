import "./config/env.js";
import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import {fileURLToPath} from 'url';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prod = process.env.NODE_ENV === 'Production';

const app = express();

// connect DB
connectDB();

app.use(cors({
    origin: prod === 'Production' ? process.env.ORIGIN : 'http://localhost:3000',
}));
app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routes
app.use('/', routes);

//static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});