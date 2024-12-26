// routes/authRoutes.js
import express from 'express';
const router =express.Router();
import { googleAuthCallback,googleAuth,logout,protectedRoute,googleAuthFailure, usercontact, registerController } from '../controllers/authController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback);
router.get('/protected', isLoggedIn, protectedRoute);
router.get('/contact', isLoggedIn, usercontact);
router.get('/logout', logout);
router.get('/google/failure', googleAuthFailure);
//route for register
export default router