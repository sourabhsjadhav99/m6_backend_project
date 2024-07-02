import express from 'express';
import { getSavedJobs,  saveAndDeleteJob } from '../controllers/saveJob.controller.js';
import authMiddleware from '../middlewares/authentication.middleware.js';

const router = express.Router();

// Routes for saved jobs
router.post('/:jobId', authMiddleware, saveAndDeleteJob);
router.get('/', authMiddleware, getSavedJobs);


export default router;

