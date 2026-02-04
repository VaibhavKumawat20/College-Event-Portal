import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    mediaUrl: { type: String, required: true }, // Image/Video URL
    category: { type: String }, // e.g., Sports, Academic, Cultural
    date: { type: Date, default: Date.now }
});

const Achievement = mongoose.model('Achievement', achievementSchema);
export default Achievement;
