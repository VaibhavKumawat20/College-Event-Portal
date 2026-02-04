import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
    try {
        // Filter by upcoming?
        const events = await Event.find({}).sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
export const createEvent = async (req, res) => {
    const { title, description, date, time, venue, registrationDeadline, bannerUrl, expiryDate } = req.body;

    try {
        const event = new Event({
            title,
            description,
            date,
            time,
            venue,
            registrationDeadline,
            bannerUrl,
            expiryDate
        });

        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
export const deleteEvent = async (req, res) => {
    try {
        // Also delete registrations?
        const event = await Event.findById(req.params.id);

        if (event) {
            await event.deleteOne();
            await Registration.deleteMany({ event: req.params.id });
            res.json({ message: 'Event removed' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register for an event
// @route   POST /api/events/:id/register
// @access  Private/Student
export const registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if already registered
        const existingReg = await Registration.findOne({
            student: req.user._id,
            event: req.params.id
        });

        if (existingReg) {
            return res.status(400).json({ message: 'Already registered' });
        }

        // Create registration
        const registration = await Registration.create({
            student: req.user._id,
            event: req.params.id
        });

        // Update count
        event.registeredCount = (event.registeredCount || 0) + 1;
        await event.save();

        res.status(201).json(registration);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user registrations
// @route   GET /api/events/my-registrations
// @access  Private/Student
export const getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ student: req.user._id })
            .populate('event')
            .sort({ registeredAt: -1 });
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
