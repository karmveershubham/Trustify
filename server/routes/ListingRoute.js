import express from 'express';
import { addProduct, getProduct } from '../controllers/listingController.js';
import upload from '../middlewares/uploadImage.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add-product', addProduct);
router.get('/products', isAuthenticated, getProduct);

export default router;
