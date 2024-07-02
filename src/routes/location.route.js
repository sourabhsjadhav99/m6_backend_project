import express from 'express';
import { createLocation, getLocations, getLocation, updateLocation, deleteLocation, getLocationsByAdmin } from '../controllers/location.controller.js';
import authMiddleware from '../middlewares/authentication.middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';

const router = express.Router();

// CRUD operations for locations
router.post('/', authMiddleware, adminMiddleware, createLocation);
router.get('/', getLocations);
router.get('/locationsbyadmin', authMiddleware, adminMiddleware, getLocationsByAdmin);
router.get('/:id', getLocation);
router.patch('/:id', authMiddleware, adminMiddleware, updateLocation);
router.delete('/:id', authMiddleware, adminMiddleware, deleteLocation);

export default router;
