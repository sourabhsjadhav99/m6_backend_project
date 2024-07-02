import express from 'express';
import { createJob, getJobs, getJob, updateJob, deleteJob, getJobsByAdmin } from '../controllers/job.controller.js';
import authMiddleware from '../middlewares/authentication.middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';

const router = express.Router();

// CRUD operations for jobs
router.post('/', authMiddleware, adminMiddleware, createJob);
router.get('/',  getJobs); 
router.get('/jobsbyadmin', authMiddleware, adminMiddleware, getJobsByAdmin);
router.get('/:id', getJob);
router.patch('/:id', authMiddleware, adminMiddleware, updateJob);
router.delete('/:id', authMiddleware, adminMiddleware, deleteJob);
export default router;
