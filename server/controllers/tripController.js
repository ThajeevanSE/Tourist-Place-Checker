import Trip from '../models/Trip.js';
import { createNotification } from './notificationController.js';

// 1. Create a New Trip
export const createTrip = async (req, res) => {
  try {
    const { title, startDate, endDate } = req.body;

    if (!title || !startDate || !endDate) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const newTrip = new Trip({
      userId: req.user.id, // Comes from verifyToken
      title,
      startDate,
      endDate,
      places: []
    });

    await newTrip.save();

    // Create notification
    await createNotification(
      req.user.id,
      'New Trip Created!',
      `You've successfully created your trip: ${title}.`,
      'trip',
      `/trips/${newTrip._id}`
    );

    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: "Error creating trip" });
  }
};

// 2. Get All Trips for Logged In User
export const getTrips = async (req, res) => {
  try {
    // Find trips where userId matches the logged-in user
    const trips = await Trip.find({ userId: req.user.id }).sort({ startDate: 1 });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips" });
  }
};

// 3. Delete a Trip
export const deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trip" });
  }
};

export const addPlaceToTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { placeId, name, address, lat, lng } = req.body;

    const trip = await Trip.findById(tripId);

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // Check if user owns this trip
    if (trip.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Check if place is already in the trip
    const exists = trip.places.find(p => p.placeId === placeId);
    if (exists) return res.status(400).json({ message: "Place already added to this trip" });

    // Add place
    trip.places.push({ placeId, name, address, lat, lng });
    await trip.save();

    // Create notification
    await createNotification(
      req.user.id,
      'Place Added!',
      `Added "${name}" to your trip: ${trip.title}.`,
      'trip',
      `/trips/${trip._id}`
    );

    res.status(200).json({ message: "Place added to trip!", trip });
  } catch (error) {
    res.status(500).json({ message: "Error adding place to trip" });
  }
};
// 5. Get Single Trip by ID
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // Security: Ensure user owns this trip
    if (trip.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trip details" });
  }
};

// 6. Remove a Place from a Trip
export const removePlaceFromTrip = async (req, res) => {
  try {
    const { tripId, placeId } = req.params;
    const trip = await Trip.findById(tripId);

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // Filter out the place to remove it
    trip.places = trip.places.filter(p => p.placeId !== placeId);
    await trip.save();

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Error removing place" });
  }
};