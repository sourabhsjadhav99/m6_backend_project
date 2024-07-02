import express from 'express';
import { applyJob, getApplications } from '../controllers/applyJob.controller.js';
import authMiddleware from '../middlewares/authentication.middleware.js';

const router = express.Router();

// Routes for job applications
router.post('/:jobId', authMiddleware, applyJob);
router.get('/', authMiddleware, getApplications);

export default router;
