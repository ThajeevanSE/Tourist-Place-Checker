import mongoose from 'mongoose';

// Define the structure for a place inside a trip
const tripPlaceSchema = new mongoose.Schema({
  placeId: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  visited: { type: Boolean, default: false } // Extra feature: Mark as visited!
}, { _id: false });

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  
  // 👇 CHANGE THIS: Use the schema instead of String array
  places: [tripPlaceSchema], 
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Trip', tripSchema);