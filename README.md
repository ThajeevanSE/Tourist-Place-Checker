# 🌍 Tourist Place Checker (MERN Stack + AI)

A full-stack **MERN web application** enhanced with **Google Gemini AI** that helps travelers discover tourist attractions, explore locations on interactive maps, check real-time weather conditions, and instantly generate complete travel itineraries.

---

## ✨ Overview

**Tourist Place Checker** is designed for travelers and explorers who want a simple yet powerful platform to:
- Search tourist destinations and view nearby attractions.
- Check live weather conditions for accurate packing.
- Save favorite places to a personal wishlist.
- **Plan trips manually** or use the **AI Trip Generator** to build day-by-day itineraries instantly.
- Download itineraries as professional PDFs.

This project is built as a **portfolio-ready, production-secure MERN application**, following real-world development practices.

---

## 🚀 Features

### 🧠 AI-Powered Trip Planner (New!)
- **Magic AI Itinerary:** Powered by **Google Gemini API**. Enter a destination, number of days, and "vibe" (e.g., Relaxing, Adventure, History), and the AI instantly builds a structured, day-by-day travel plan.

### 🧳 Trip Management & Export
- Create manual trips with custom dates.
- Add specific places to your itinerary directly from the map or nearby attractions list.
- **PDF Export:** Download your detailed trip itinerary as a clean, formatted PDF (`jspdf` & `jspdf-autotable`).

### 🗺️ Interactive Maps & Attractions
- Google Maps integration with custom markers.
- **Smart Search:** Autocomplete search bar for cities and places.
- **Nearby Attractions:** Automatically fetches top tourist spots within a 5km radius, complete with photos, ratings, and editorial descriptions.

### ❤️ Favorites System
- Save places to a personal, persistent list tied to your user account.

### 🌦️ Real-time Weather
- Displays current Temperature, Wind Speed, and Humidity using the OpenWeatherMap API.

### 🛡️ Enterprise-Grade Security
- **Authentication:** Secure registration & login using **JWT (JSON Web Tokens)**.
- **Password Encryption:** Hashed securely with **bcryptjs**.
- **Security Hardening:** - `helmet`: Secures HTTP response headers.
  - `express-rate-limit`: Prevents brute-force and DDoS attacks.
  - `express-mongo-sanitize`: Prevents NoSQL injection attacks.

---

## 🛠️ Tech Stack

### Frontend (Client)
- ⚛️ **React.js** (Vite)
- 🎨 **Tailwind CSS**
- 🗺️ **@react-google-maps/api**
- 📄 **jsPDF / jsPDF-AutoTable** (For PDF Generation)
- 🔄 **React Context API** (State Management)
- 🌐 **Axios** (HTTP Client)

### Backend (Server)
- 🟢 **Node.js** & **Express.js**
- 🍃 **MongoDB** (Mongoose)
- 🤖 **@google/generative-ai** (Gemini AI SDK)
- 🔐 **JWT** & **bcryptjs** (Auth)
- 🛡️ **Helmet, Rate-Limit, Mongo-Sanitize** (Security)

---

## 🌐 External APIs
1. **Google Maps Platform:** Maps JavaScript API, Places API (V3/New), Geocoding API.
2. **Google Gemini API:** `gemini-2.5-flash` model for intelligent itinerary generation.
3. **OpenWeatherMap API:** Real-time location-based weather data.

---

## ⚙️ Environment Variables

To run this project locally, you must configure environment variables for both **server** and **client**.

### 1️⃣ Backend Environment (`server/.env`)
Create a file at `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/tourist-checker
JWT_SECRET=your_super_secret_key_123
WEATHER_API_KEY=your_openweathermap_api_key
GEMINI_API_KEY=your_google_gemini_api_key

```

### 2️⃣ Frontend Environment (`client/.env`)

Create a file at `client/.env`:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

```

---

## 🏃‍♂️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone [https://github.com/your-username/tourist-checker.git](https://github.com/your-username/tourist-checker.git)
cd tourist-checker

```

### 2️⃣ Setup Backend

```bash
cd server
npm install
npm run dev

```

*You should see:*
`🚀 Server running securely on port 5000`
`✅ MongoDB Connected`

### 3️⃣ Setup Frontend

Open a new terminal window:

```bash
cd client
npm install
npm run dev

```

*Now open your browser to:* `http://localhost:5173`

---

## 📂 Project Structure

```text
tourist-checker/
│
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI (Map, Weather, Navbar, PrivateRoute)
│   │   ├── pages/           # Pages (Home, Login, Register, Trips, TripDetails)
│   │   ├── context/         # Authentication State
│   │   └── App.jsx          # Routing & Layout
│   └── .env                 # Frontend environment variables
│
├── server/                  # Express Backend
│   ├── models/              # MongoDB Schemas (User, Trip, Favorite)
│   ├── routes/              # API Routes (Auth, Weather, Trips, AI)
│   ├── controllers/         # Business Logic & AI Prompt Engineering
│   ├── index.js             # Server Entry Point (Middlewares & DB)
│   └── .env                 # Backend environment variables
│
└── README.md                # Project Documentation

```

---

## 🤝 Contributing

Contributions are welcome and appreciated 🙌

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m "Add AmazingFeature"`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📌 Author

**Thajeevan Vasanth**
Software Engineering | MERN Stack Developer

```

This updated version reflects all the hard work you've put in over the last several phases. It looks incredibly professional and makes it clear to anyone reading it (like your mentor or a future employer) exactly what you are capable of building!

```