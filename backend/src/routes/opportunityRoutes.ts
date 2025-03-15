import express from 'express';
import { createOpportunity, getOpportunities, getMyOpportunities, updateOpportunity, deleteOpportunity } from '../controllers/opportunityController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getOpportunities);

// Protected routes
router.post('/', auth, createOpportunity);
router.get('/my-opportunities', auth, getMyOpportunities);
router.put('/:id', auth, updateOpportunity);
router.delete('/:id', auth, deleteOpportunity);

export default router; 