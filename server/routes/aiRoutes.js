import express from 'express';
import { generateTrip } from '../controllers/aiController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route: Only logged-in users can generate trips
router.post('/generate', verifyToken, generateTrip);

export default router;