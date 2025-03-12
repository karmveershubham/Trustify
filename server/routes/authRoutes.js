// routes/authRoutes.js
import express from 'express';
const router =express.Router();
import { login , logout, userProfile} from '../controllers/authController.js';
import { isAuthenticated, loginValidation } from '../middlewares/authMiddleware.js';

//const router =express.Router();
//auth/login

router.post('/login',loginValidation,login);
router.get('/profile', isAuthenticated, userProfile);
router.post('/logout', isAuthenticated ,logout);

export default router;
