import express from 'express';
const router = express.Router();
import passport from 'passport'

import { login, registerController } from '../controllers/authController.js';
import { loginValidation, signupValidation } from '../middlewares/authMiddleware.js';
import accessTokenAutoRefresh from '../middlewares/aceessTokenAutoRefresh.js';

//public routes
router.post('/api/signup/',signupValidation, registerController)
router.post('/api/login',loginValidation, login)

//protected Routes

// router.get('api/me', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), userProfile)

export default router;