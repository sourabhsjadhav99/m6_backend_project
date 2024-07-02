import express from 'express';
import { createCompany, getCompanies, getCompany, updateCompany, deleteCompany, getCompaniesByAdmin } from '../controllers/company.controller.js';
import authMiddleware from '../middlewares/authentication.middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';

const router = express.Router();

// CRUD operations for companies
router.post('/', authMiddleware, adminMiddleware, createCompany);
router.get('/',  getCompanies);
router.get('/companiesbyadmin', authMiddleware, adminMiddleware, getCompaniesByAdmin);
router.get('/:id', getCompany);
router.patch('/:id', authMiddleware, adminMiddleware, updateCompany);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCompany);

export default router;
