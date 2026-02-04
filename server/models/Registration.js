import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    status: { type: String, enum: ['registered', 'cancelled', 'attended'], default: 'registered' },
    registeredAt: { type: Date, default: Date.now }
});

// Prevent duplicate registrations
registrationSchema.index({ student: 1, event: 1 }, { unique: true });

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;
