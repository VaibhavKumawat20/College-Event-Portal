import express from 'express';
import { getAchievements, createAchievement } from '../controllers/achievementController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getAchievements)
    .post(protect, admin, createAchievement);

export default router;
