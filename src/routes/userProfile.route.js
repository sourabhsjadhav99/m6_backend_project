import express from 'express';
import { createProfile, getProfiles, getProfile, updateProfile, deleteProfile } from '../controllers/userProfile.controller.js';
import authMiddleware from '../middlewares/authentication.middleware.js';
import upload from '../middlewares/uploadPdf.middleware.js';

const router = express.Router();

// CRUD operations for profiles
router.post('/', authMiddleware, upload.single('cv'), createProfile);
router.get('/', authMiddleware, getProfiles);
router.get('/:id', authMiddleware, getProfile);
router.put('/:id', authMiddleware, upload.single('cv'), updateProfile);
router.delete('/:id', authMiddleware, deleteProfile);

export default router;
