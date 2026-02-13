import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; 
import { AuthProvider } from './context/AuthContext'; 
import Favorites from './pages/Favorites';
import Trips from './pages/Trips';

function App() {
  return (
    <AuthProvider> 
      <Router>
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">🏝️ Tourist Checker</Link>
          <div className="flex gap-4">
            <Link to="/favorites" className="hover:text-blue-300">Favorites</Link> {/* 👈 Add this */}
  <Link to="/login" className="hover:text-blue-300">Login</Link>
  <Link to="/register" className="hover:text-blue-300">Register</Link>
  <Link to="/trips" className="hover:text-blue-300">My Trips</Link>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/trips" element={<Trips />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;