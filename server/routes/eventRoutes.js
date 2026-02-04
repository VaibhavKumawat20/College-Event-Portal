import express from 'express';
import { getEvents, createEvent, deleteEvent, registerForEvent, getMyRegistrations } from '../controllers/eventController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my-registrations', protect, getMyRegistrations); // Must be before /:id

router.route('/')
    .get(getEvents)
    .post(protect, admin, createEvent);

router.route('/:id')
    .delete(protect, admin, deleteEvent);

router.post('/:id/register', protect, registerForEvent);

export default router;
