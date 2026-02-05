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

// Request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} | Origin: ${req.headers.origin}`);
    next();
});

// Update CORS to allow any localhost
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (origin.startsWith('http://localhost')) {
            return callback(null, true);
        }

        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
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
