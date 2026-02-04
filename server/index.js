import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));
app.use(cookieParser());

// Database Connection
connectDB();

// Routes
import authRoutes from './routes/authRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/achievements', achievementRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
