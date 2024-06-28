import express from 'express';
import { saveJob, getSavedJobs, deleteSavedJob } from '../controllers/saveJob.controller.js';
import authMiddleware from '../middlewares/authentication.middleware.js';

const router = express.Router();

// Routes for saved jobs
router.post('/', authMiddleware, saveJob);
router.get('/', authMiddleware, getSavedJobs);
router.delete('/:id', authMiddleware, deleteSavedJob);

export default router;

