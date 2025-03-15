import express from 'express';
import { auth } from '../middleware/auth';
import { getEvents, getRegisteredEvents, createEvent } from '../controllers/eventController';

const router = express.Router();

// Public routes
router.get('/', getEvents);

// Protected routes
router.post('/', auth, createEvent);
router.get('/registrations', auth, getRegisteredEvents);

export default router; 