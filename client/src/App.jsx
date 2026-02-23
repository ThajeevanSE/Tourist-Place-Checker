import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import Trips from './pages/Trips';
import TripDetails from './pages/TripDetails';
import PrivateRoute from './components/PrivateRoute'; // 👈 Import the guard

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes (Anyone can see) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👇 PROTECTED ROUTES (Must be logged in) */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/favorites" 
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/trips" 
          element={
            <PrivateRoute>
              <Trips />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/trips/:id" 
          element={
            <PrivateRoute>
              <TripDetails />
            </PrivateRoute>
          } 
        />
        
        {/* Catch-all: Redirect unknown pages to Home (which then redirects to Login) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;