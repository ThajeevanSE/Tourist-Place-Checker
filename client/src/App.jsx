import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      {/* Temporary Navbar */}
      <nav className="bg-gray-800 p-4 text-white flex gap-4">
        <Link to="/" className="hover:text-blue-300">Home</Link>
        <Link to="/login" className="hover:text-blue-300">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;