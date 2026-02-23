import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Map, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold hover:text-blue-100">
          <Map size={24} />
          Tourist Checker
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          {user ? (
            //  Show these ONLY if logged in
            <>
              <Link to="/" className="hover:text-blue-200">Home</Link>
              <Link to="/trips" className="hover:text-blue-200">My Trips</Link>
              <Link to="/favorites" className="hover:text-blue-200">Favorites</Link>
              
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-blue-400">
                <span className="text-sm font-medium">Hello, {user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </>
          ) : (
            //  Show these ONLY if logged out
            <div className="flex gap-4">
              <Link to="/login" className="hover:text-blue-200 font-medium">Login</Link>
              <Link to="/register" className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 font-medium transition">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;