import express from 'express';
import { createJob, getJobs, getJob, updateJob, deleteJob } from '../controllers/job.controller.js';
import authMiddleware from '../middlewares/authentication.middleware.js';

const router = express.Router();

// CRUD operations for jobs
router.post('/', authMiddleware, createJob);
router.get('/', authMiddleware, getJobs); // Updated to include search by location ID
router.get('/:id', authMiddleware, getJob);
router.put('/:id', authMiddleware, updateJob);
router.delete('/:id', authMiddleware, deleteJob);
export default router;
