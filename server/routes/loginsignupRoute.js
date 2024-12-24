import express from 'express';
const router =express.Router();
import { login, registerController } from '../controllers/authController.js';
import { loginValidation, signupValidation } from '../middlewares/authMiddleware.js';
//const router =express.Router();
router.post('/signup',signupValidation,registerController)
router.post('/login',loginValidation,login)
export default router;
