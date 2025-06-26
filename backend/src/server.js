import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(rateLimiter);

app.use('/api/notes', notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    });
});
