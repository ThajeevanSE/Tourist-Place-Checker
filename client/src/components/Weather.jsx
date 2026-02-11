import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react'; // Icons

const Weather = ({ lat, lng }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lat && lng) {
      fetchWeather();
    }
  }, [lat, lng]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      // Call YOUR backend, not OpenWeather directly
      const res = await axios.get(`/api/weather?lat=${lat}&lng=${lng}`);
      setWeather(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Weather error:", error);
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4 text-gray-500">Loading Weather...</div>;
  if (!weather) return null;

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">Current Weather 🌤️</h3>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
          <p className="capitalize text-lg opacity-90">{weather.weather[0].description}</p>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <Wind size={20} />
            <span>{weather.wind.speed} m/s</span>
          </div>
          <p className="opacity-75">Humidity: {weather.main.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;