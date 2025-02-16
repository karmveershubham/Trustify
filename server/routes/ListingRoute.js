import express from 'express';
import { addProduct, getProducts } from '../controllers/listingController.js';
import upload from '../middlewares/uploadImage.js';

const router = express.Router();

router.post('/add-product', upload.single('image'), addProduct);
router.get('/products', getProducts);

export default router;
