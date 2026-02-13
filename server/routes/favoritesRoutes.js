import express from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favoritesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// All these routes are protected by "verifyToken"
router.post('/', verifyToken, addFavorite);
router.get('/', verifyToken, getFavorites);
router.delete('/:placeId', verifyToken, removeFavorite);

export default router;