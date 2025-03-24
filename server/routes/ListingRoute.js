import express from 'express';
import { addProduct, getProducts } from '../controllers/listingController.js';
import upload from '../middlewares/uploadImage.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add-product', upload.single('image'), addProduct);
router.get('/products', isAuthenticated, getProducts);

export default router;
