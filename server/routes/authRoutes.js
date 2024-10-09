// routes/authRoutes.js
import express from 'express';
const router =express.Router();

import * as authController from '../controllers/authController.js';
import { googleAuthCallback,googleAuth,logout,protectedRoute,googleAuthFailure } from '../controllers/authController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';


router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback);
router.get('/protected', isLoggedIn, protectedRoute);
router.get('/logout', logout);
router.get('/google/failure', googleAuthFailure);




export default router;
