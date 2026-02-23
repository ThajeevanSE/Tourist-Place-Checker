import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  // If there is no user, redirect to Login
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;