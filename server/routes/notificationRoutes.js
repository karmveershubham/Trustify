import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { getUserNotifications, markNotificationAsRead } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/notifications', isAuthenticated, getUserNotifications);
router.patch('/notifications/:notificationId/mark-read', isAuthenticated, markNotificationAsRead);

export default router;
