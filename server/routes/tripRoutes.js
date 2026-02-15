import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { 
  createTrip, getTrips, deleteTrip, addPlaceToTrip, 
  getTripById, removePlaceFromTrip 
} from '../controllers/tripController.js';

const router = express.Router();

// All routes are protected
router.post('/', verifyToken, createTrip);
router.get('/', verifyToken, getTrips);
router.delete('/:id', verifyToken, deleteTrip);
router.get('/:id', verifyToken, getTripById);
router.delete('/:tripId/place/:placeId', verifyToken, removePlaceFromTrip);

router.post('/:tripId/add', verifyToken, addPlaceToTrip);
export default router;