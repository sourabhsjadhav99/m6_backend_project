import express from 'express';
import { createLocation, getLocations, getLocation, updateLocation, deleteLocation } from '../controllers/location.controller.js';
import authMiddleware from '../middlewares/authentication.middleware.js';

const router = express.Router();

// CRUD operations for locations
router.post('/', authMiddleware, createLocation);
router.get('/', authMiddleware, getLocations);
router.get('/:id', authMiddleware, getLocation);
router.put('/:id', authMiddleware, updateLocation);
router.delete('/:id', authMiddleware, deleteLocation);

export default router;
