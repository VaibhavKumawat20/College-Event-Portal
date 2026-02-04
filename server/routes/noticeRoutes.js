import express from 'express';
import { getNotices, createNotice, deleteNotice } from '../controllers/noticeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getNotices)
    .post(protect, admin, createNotice);

router.route('/:id')
    .delete(protect, admin, deleteNotice);

export default router;
