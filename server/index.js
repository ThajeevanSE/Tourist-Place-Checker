import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';

// 1. Force load the .env file from the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// 2. DEBUGGING LOGS (Check what is loaded)
console.log("--- DEBUGGING ---");
console.log("Current Directory:", __dirname);
console.log("MONGO_URI Status:", process.env.MONGO_URI ? "Loaded ✅" : "Missing ❌");
console.log("-----------------");

// Middleware
app.use(express.json());
app.use(cors());

// Basic Route
app.get('/', (req, res) => {
  res.send('Tourist Place Checker API is running...');
});

// Database Connection
if (!process.env.MONGO_URI) {
  console.error("❌ CRITICAL ERROR: MONGO_URI is missing. Check your .env file!");
  process.exit(1); // Stop the server if no DB
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.use('/api/auth', authRoutes);
    app.use('/api/weather', weatherRoutes);
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));