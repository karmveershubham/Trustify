import express from 'express';
import { getContacts } from '../controllers/contactController.js';

const router = express.Router();

// Route for adding a product with an image
router.get('/contacts', getContacts);

export default router;
