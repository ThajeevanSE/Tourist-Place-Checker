import Trip from '../models/Trip.js';

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