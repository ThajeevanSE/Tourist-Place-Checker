import mongoose from 'mongoose';

// 1. Define this FIRST (before using it)
const favoriteSchema = new mongoose.Schema({
  placeId: { type: String, required: true }, 
  name: { type: String, required: true },
  address: { type: String },
  lat: { type: Number },
  lng: { type: Number }
}, { _id: false }); 

// 2. Now use it inside userSchema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  
  favorites: [favoriteSchema], 
  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);