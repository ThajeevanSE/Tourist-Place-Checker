import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. IMPORT SECURITY PACKAGES
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import favoritesRoutes from './routes/favoritesRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// Force load the .env file from the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy (Needed for rate limiting if behind a proxy like Vite/Render)
app.set('trust proxy', 1);

// DEBUGGING LOGS
console.log("--- DEBUGGING ---");
console.log("Current Directory:", __dirname);
console.log("MONGO_URI Status:", process.env.MONGO_URI ? "Loaded ✅" : "Missing ❌");
console.log("-----------------");

// ==========================================
// 🛡️ SECURITY & STANDARD MIDDLEWARES
// ==========================================

// 1. CORS MUST GO FIRST
app.use(cors());

// 2. Helmet: Secures HTTP headers
app.use(helmet()); 

// 3. Express JSON & URL Encoded
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// 4. Mongo Sanitize (Custom Bug-Fix Version)
// We manually sanitize the objects to prevent the "getter" crash in newer Express versions
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body, { replaceWith: '_' });
  if (req.params) mongoSanitize.sanitize(req.params, { replaceWith: '_' });
  if (req.query) mongoSanitize.sanitize(req.query, { replaceWith: '_' });
  next();
});

// 5. Rate Limiting: Prevents brute force & DDoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
  message: { message: "Too many requests from this IP, please try again later." }
});
app.use('/api', limiter); 

// ==========================================
// 🚀 MOUNT ROUTES
// ==========================================

app.get('/', (req, res) => {
  res.send('Tourist Place Checker API is running securely...');
});

app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/ai', aiRoutes);

// ==========================================
// 🗄️ DATABASE CONNECTION & SERVER START
// ==========================================

if (!process.env.MONGO_URI) {
  console.error("❌ CRITICAL ERROR: MONGO_URI is missing. Check your .env file!");
  process.exit(1); 
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => console.log(`🚀 Server running securely on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));