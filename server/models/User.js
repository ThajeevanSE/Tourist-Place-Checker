import mongoose from 'mongoose';


const favoriteSchema = new mongoose.Schema({
  placeId: { type: String, required: true }, 
  name: { type: String, required: true },
  address: { type: String },
  lat: { type: Number },
  lng: { type: Number }
}, { _id: false }); 

//userSchema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  
  favorites: [favoriteSchema], 
  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);