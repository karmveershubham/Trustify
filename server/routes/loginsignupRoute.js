import express from 'express';
const router =express.Router();
import { login } from '../controllers/authController.js';
import { loginValidation,  } from '../middlewares/authMiddleware.js';
//const router =express.Router();

router.post('/login',loginValidation,login)
export default router;
