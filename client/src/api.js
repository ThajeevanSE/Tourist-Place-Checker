import axios from 'axios';

const api = axios.create({
  // 👇 Removed the '/api' from the end of the Render URL
  baseURL: import.meta.env.VITE_API_URL || 'https://tourist-place-checker.onrender.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;