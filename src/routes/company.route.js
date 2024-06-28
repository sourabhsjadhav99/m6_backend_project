import express from 'express';
import { createCompany, getCompanies, getCompany, updateCompany, deleteCompany } from '../controllers/company.controller.js';
import authMiddleware from '../middlewares/authentication.middleware.js';

const router = express.Router();

// CRUD operations for companies
router.post('/', authMiddleware, createCompany);
router.get('/', authMiddleware, getCompanies);
router.get('/:id', authMiddleware, getCompany);
router.put('/:id', authMiddleware, updateCompany);
router.delete('/:id', authMiddleware, deleteCompany);

export default router;
