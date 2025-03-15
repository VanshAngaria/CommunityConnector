import express from 'express';
import { register, login, getProfile, updateProfile, registerForEvent, applyForOpportunity } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.post('/events/:eventId/register', auth, registerForEvent);
router.post('/opportunities/:opportunityId/apply', auth, applyForOpportunity);

export default router; 