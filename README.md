# 🌍 Tourist Place Checker (MERN Stack)

A full-stack **MERN web application** that helps travelers discover tourist attractions, explore locations on interactive maps, check real-time weather conditions, and plan trips efficiently.

---

## ✨ Overview

**Tourist Place Checker** is designed for travelers and explorers who want a simple yet powerful platform to:
- Search tourist destinations
- View locations on Google Maps
- Check live weather conditions
- (Upcoming) Plan trips and save favorite places

This project is built as a **portfolio-ready MERN application**, following real-world development practices.

---

## 🚀 Features

### ✅ Currently Implemented
- 🔐 **User Authentication**
  - Secure registration & login using **JWT (JSON Web Tokens)**
  - Password encryption with **bcrypt**

- 🗺️ **Interactive Maps**
  - Google Maps integration
  - Search and visualize locations easily

- 🔍 **Smart Search**
  - Autocomplete search bar for cities and tourist places
  - Powered by Google Places API

- 🌦️ **Real-time Weather**
  - Displays current:
    - Temperature
    - Wind speed
    - Humidity
  - Fetched using OpenWeatherMap API

- 📱 **Responsive UI**
  - Built with **React + Tailwind CSS**
  - Fully responsive for mobile, tablet, and desktop

---

### 🚧 Roadmap (Coming Soon)
- 🧳 **Trip Planner**
  - Create itineraries with dates
  - Drag-and-drop place ordering

- ❤️ **Favorites / Wishlist**
  - Save places to a personal list

- ⭐ **Reviews & Ratings**
  - Rate and review visited places

- 📍 **Nearby Recommendations**
  - Find hotels and restaurants near a selected location

---

## 🛠️ Tech Stack

### Frontend (Client)
- ⚛️ **React.js** (Vite)
- 🎨 **Tailwind CSS**
- 🗺️ **@react-google-maps/api**
- 🔄 **React Context API** (State Management)
- 🌐 **Axios** (HTTP Client)

### Backend (Server)
- 🟢 **Node.js**
- 🚀 **Express.js**
- 🍃 **MongoDB** (Mongoose)
- 🔐 **JWT Authentication**
- 🔑 **bcrypt.js** (Password hashing)
- ✅ **Zod** (Planned) / Manual validation

---

## 🌐 External APIs
- **Google Maps Platform**
  - Maps JavaScript API
  - Places API (Autocomplete)
  - Geocoding API

- **OpenWeatherMap API**
  - Real-time weather data

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

2️⃣ Frontend Environment (client/.env)

Create a file at client/.env:

VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

🏃‍♂️ Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/tourist-checker.git
cd tourist-checker

2️⃣ Setup Backend
cd server
npm install
npm run dev


You should see:

🚀 Server running on port 5000
✅ MongoDB Connected

3️⃣ Setup Frontend

Open a new terminal:

cd client
npm install
npm run dev


Now open:

http://localhost:5173

📂 Project Structure
tourist-checker/
│
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI (Map, Weather, Navbar)
│   │   ├── pages/           # Pages (Home, Login, Register)
│   │   ├── context/         # Authentication State
│   │   └── App.jsx          # Routing & Layout
│   └── .env                 # Frontend environment variables
│
├── server/                  # Express Backend
│   ├── models/              # MongoDB Schemas (User, Place)
│   ├── routes/              # API Routes (Auth, Weather)
│   ├── controllers/         # Business Logic
│   ├── index.js             # Server Entry Point
│   └── .env                 # Backend environment variables
│
└── README.md                # Project Documentation

🤝 Contributing

Contributions are welcome and appreciated 🙌

Fork the project

Create your feature branch:

git checkout -b feature/AmazingFeature


Commit your changes:

git commit -m "Add AmazingFeature"


Push to the branch:

git push origin feature/AmazingFeature


Open a Pull Request

📌 Author

Thajeevan Vasanth
Software Engineering | MERN Stack Developer