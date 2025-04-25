import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { getUserNotifications, clearAllNotifications } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/notifications', isAuthenticated, getUserNotifications);
router.delete('/notifications', isAuthenticated, clearAllNotifications);

export default router;
