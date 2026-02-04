import Notice from '../models/Notice.js';

// @desc    Get all notices
// @route   GET /api/notices
// @access  Public (or semi-private)
export const getNotices = async (req, res) => {
    try {
        const { type } = req.query; // type='active' or 'expired'
        let query = {};
        if (type === 'active') {
            query.expiryDate = { $gte: new Date() };
        } else if (type === 'expired') {
            query.expiryDate = { $lt: new Date() };
        }
        // Also include notices with no expiry if type is active, or handle null? 
        // For simplicity: if active, expiry > now OR expiry is null.
        if (type === 'active') {
            query = {
                $or: [
                    { expiryDate: { $gte: new Date() } },
                    { expiryDate: { $exists: false } },
                    { expiryDate: null }
                ]
            }
        }

        const notices = await Notice.find(query).sort({ postedDate: -1 });
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a notice
// @route   POST /api/notices
// @access  Private/Admin
export const createNotice = async (req, res) => {
    const { title, description, expiryDate, attachmentUrl } = req.body;

    try {
        const notice = new Notice({
            title,
            description,
            expiryDate,
            attachmentUrl,
            postedBy: req.user._id
        });

        const createdNotice = await notice.save();
        res.status(201).json(createdNotice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a notice
// @route   DELETE /api/notices/:id
// @access  Private/Admin
export const deleteNotice = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);

        if (notice) {
            await notice.deleteOne();
            res.json({ message: 'Notice removed' });
        } else {
            res.status(404).json({ message: 'Notice not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
