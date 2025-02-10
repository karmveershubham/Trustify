import express from 'express';
import { addProduct, getProducts } from '../controllers/listingController.js';
import upload from '../middlewares/uploadImage.js';

const router = express.Router();

// Route for adding a product with an image
router.post('/add', upload.single('image'), addProduct);
router.get('/all', getProducts);

export default router;
