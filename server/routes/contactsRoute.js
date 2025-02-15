import express from 'express';
import { getContacts } from '../controllers/contactController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route for adding a product with an image
router.get('/contacts', isAuthenticated, getContacts);

export default router;
