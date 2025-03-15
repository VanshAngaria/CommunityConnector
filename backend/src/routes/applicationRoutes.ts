import express from 'express';
import { getApplications, createApplication, updateApplication } from '../controllers/applicationController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Protected routes
router.get('/', auth, getApplications);
router.post('/:opportunityId', auth, createApplication);
router.put('/:id', auth, updateApplication);

export default router; 