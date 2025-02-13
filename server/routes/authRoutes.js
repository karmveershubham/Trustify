// routes/authRoutes.js
import express from 'express';
const router =express.Router();
import { login , logout} from '../controllers/authController.js';
import { loginValidation } from '../middlewares/authMiddleware.js';

//const router =express.Router();

router.post('/login',loginValidation,login)

router.get('/logout', logout);

export default router;
