import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 5001;

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api/notes', notesRoutes);

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});