// server/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: String }], // We will store Google Place IDs here
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);