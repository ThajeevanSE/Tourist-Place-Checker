import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; // We will create this next
import { AuthProvider } from './context/AuthContext'; // IMPORT THIS

function App() {
  return (
    <AuthProvider> {/* WRAP EVERYTHING HERE */}
      <Router>
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">🏝️ Tourist Checker</Link>
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-blue-300">Login</Link>
            <Link to="/register" className="hover:text-blue-300">Register</Link>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;