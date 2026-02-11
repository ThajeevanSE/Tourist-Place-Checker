🌍 Tourist Place Checker (MERN Stack)
A full-stack web application that helps travelers discover tourist attractions, view them on interactive maps, check real-time weather, and plan their trips efficiently.

🚀 Features
✅ Currently Implemented
User Authentication: Secure Registration & Login using JWT (JSON Web Tokens).

Interactive Maps: Google Maps integration to search and view locations.

Smart Search: Autocomplete search bar for finding cities and tourist spots.

Real-time Weather: Instantly fetches current weather conditions (Temp, Wind, Humidity) for any selected place.

Responsive UI: Built with React + Tailwind CSS for a mobile-friendly experience.

🚧 Coming Soon (Roadmap)
Trip Planner: Create itineraries with dates and drag-and-drop ordering.

Favorites System: Save places to a personal "Wishlist".

Reviews & Ratings: Users can rate places they have visited.

Nearby Recommendations: "Find hotels/restaurants near this location."

🛠️ Tech Stack
Frontend (Client)
Framework: React.js (Vite)

Styling: Tailwind CSS

Maps: @react-google-maps/api

State Management: React Context API

HTTP Client: Axios

Backend (Server)
Runtime: Node.js

Framework: Express.js

Database: MongoDB (Mongoose)

Authentication: JWT & Bcrypt.js

Validation: Zod (planned) / Manual validation

External APIs
Google Maps Platform:

Maps JavaScript API

Places API (Autocomplete)

Geocoding API

OpenWeatherMap API: Current weather data.

⚙️ Environment Variables
To run this project, you need to set up environment variables in both client and server folders.

1. Backend (.env)
Create a file server/.env:

Code snippet
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/tourist-checker
JWT_SECRET=your_super_secret_key_123
WEATHER_API_KEY=your_openweathermap_api_key
2. Frontend (.env)
Create a file client/.env:

Code snippet
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
🏃‍♂️ Getting Started
1. Clone the Repository
Bash
git clone https://github.com/your-username/tourist-checker.git
cd tourist-checker
2. Setup Backend
Bash
cd server
npm install        # Install dependencies
npm run dev        # Start server (runs on port 5000)
You should see: 🚀 Server running on port 5000 and ✅ MongoDB Connected

3. Setup Frontend
Open a new terminal:

Bash
cd client
npm install        # Install dependencies
npm run dev        # Start React app
Open http://localhost:5173 in your browser.

📂 Project Structure
Bash
tourist-checker/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI (Map, Weather, Navbar)
│   │   ├── pages/          # Full pages (Home, Login, Register)
│   │   ├── context/        # Auth State Management
│   │   └── App.jsx         # Routing & Layout
│   └── .env                # API Keys for Frontend
│
├── server/                 # Express Backend
│   ├── models/             # Database Schemas (User, Place)
│   ├── routes/             # API Endpoints (Auth, Weather)
│   ├── controllers/        # Logic for endpoints
│   ├── index.js            # Server entry point
│   └── .env                # API Keys & DB Connection
│
└── README.md               # Documentation
🤝 Contributing
Contributions are welcome!

Fork the project.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.