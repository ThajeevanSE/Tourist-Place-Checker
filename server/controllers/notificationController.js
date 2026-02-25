import Notification from '../models/Notification.js';

// Get all notifications for a user
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: 'Server error fetching notifications' });
    }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        if (notification.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        notification.isRead = true;
        await notification.save();
        res.json(notification);
    } catch (err) {
        res.status(500).json({ message: 'Server error marking notification as read' });
    }
};

// Mark all as read
export const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { userId: req.user.id, isRead: false },
            { $set: { isRead: true } }
        );
        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        res.status(500).json({ message: 'Server error marking all as read' });
    }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        if (notification.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await notification.deleteOne();
        res.json({ message: 'Notification removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error deleting notification' });
    }
};

// Helper to create notifications (internal use)
export const createNotification = async (userId, title, message, type = 'system', link = '') => {
    try {
        const notification = new Notification({
            userId,
            title,
            message,
            type,
            link
        });
        await notification.save();
        return notification;
    } catch (err) {
        console.error('Error creating notification:', err);
    }
};
