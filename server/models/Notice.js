import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    postedDate: { type: Date, default: Date.now },
    expiryDate: { type: Date }, // Optional: Auto-expire
    status: { type: String, enum: ['active', 'expired'], default: 'active' },
    attachmentUrl: { type: String }, // URL to simple storage
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Notice = mongoose.model('Notice', noticeSchema);
export default Notice;
