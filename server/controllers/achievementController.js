import Achievement from '../models/Achievement.js';

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
export const getAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find({}).sort({ date: -1 });
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an achievement
// @route   POST /api/achievements
// @access  Private/Admin
export const createAchievement = async (req, res) => {
    const { title, description, mediaUrl, category } = req.body;

    try {
        const achievement = new Achievement({
            title,
            description,
            mediaUrl,
            category
        });

        const createdAchievement = await achievement.save();
        res.status(201).json(createdAchievement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
