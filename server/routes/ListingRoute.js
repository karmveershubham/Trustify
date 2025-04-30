import express from 'express';
import { addProduct, getProduct, getProductById, verifyProduct, getMyListings } from '../controllers/listingController.js';
import upload from '../middlewares/uploadImage.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add-product', isAuthenticated, upload.single('image'), addProduct);
router.get('/products', isAuthenticated, getProduct);
router.get('/products/:id', isAuthenticated, getProductById); // Assuming you want to get a product by ID
router.post("/products/:productId/verify", isAuthenticated, verifyProduct);
router.get('/my-listings', isAuthenticated, getMyListings);

export default router;
