import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  places: [{ type: String }], // We will store Place IDs here later
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Trip', tripSchema);