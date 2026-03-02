import axios from 'axios';
// Create an axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://tourist-place-checker.onrender.com/api', // Use env variable or live backend
});

// Automatically add the token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;