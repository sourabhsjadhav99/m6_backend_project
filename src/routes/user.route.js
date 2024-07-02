import express from 'express';
import { signup, signin, signout } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/authentication.middleware.js';

const router = express.Router();

// routes for signup, signin, and signout
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', authMiddleware ,signout);

export default router;