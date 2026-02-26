import User from '../models/User.js';
import { createNotification } from './notificationController.js';

export const addFavorite = async (req, res) => {
  try {
    console.log("1. Request received");
    console.log("User from Token:", req.user);
    console.log("Body:", req.body);

    const userId = req.user.id;
    const { placeId, name, address, lat, lng } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(404).json({ message: "User not found" });
    }
    console.log("2. User found:", user.email);

    // Check if place already exists
    if (user.favorites.some(fav => fav.placeId === placeId)) {
      return res.status(400).json({ message: "Place already in favorites" });
    }

    console.log("3. Pushing to favorites...");
    user.favorites.push({ placeId, name, address, lat, lng });

    await user.save();
    console.log("4. Saved successfully!");

    // Create notification
    await createNotification(
      req.user.id,
      'New Favorite!',
      `You've added ${name} to your favorites list.`,
      'recommendation',
      '/favorites'
    );

    res.status(200).json({ message: "Added to favorites!", favorites: user.favorites });
  } catch (error) {
    console.error("❌ SERVER ERROR:", error); // THIS PRINT IS WHAT WE NEED
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. Get All Favorites
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 3. Remove Favorite
export const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { placeId } = req.params;

    const user = await User.findById(userId);
    user.favorites = user.favorites.filter(fav => fav.placeId !== placeId);
    await user.save();

    res.status(200).json({ message: "Removed from favorites", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};