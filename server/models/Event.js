import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    registrationDeadline: { type: Date, required: true },
    bannerUrl: { type: String },
    expiryDate: { type: Date }, // Usually after registration deadline or event date
    seats: { type: Number }, // Optional capacity
    registeredCount: { type: Number, default: 0 },
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
