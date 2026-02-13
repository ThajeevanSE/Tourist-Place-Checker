import express from 'express';
import { createTrip, getTrips, deleteTrip } from '../controllers/tripController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.post('/', verifyToken, createTrip);
router.get('/', verifyToken, getTrips);
router.delete('/:id', verifyToken, deleteTrip);

export default router;