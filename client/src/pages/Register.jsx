import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      alert('Registration Successful! Please Login.');
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" placeholder="Name" required 
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="email" placeholder="Email" required 
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" placeholder="Password" required 
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;