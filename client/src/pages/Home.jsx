import React, { useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import Weather from '../components/Weather';

// 1. Define libraries OUTSIDE the component to fix the "Performance Warning"
const libraries = ['places'];

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // 2. Load the Google Maps Script here (Centralized Loading)
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries, // Use the constant variable
  });

  const handlePlaceSelect = (locationData) => {
    setSelectedLocation(locationData);
  };

  if (loadError) return <div className="p-4 text-center text-red-500">Error loading Maps</div>;
  if (!isLoaded) return <div className="p-4 text-center">Loading Google Maps...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Plan Your Next Trip ✈️
      </h1>

      {/* Only render these when isLoaded is true (handled above) */}
      <SearchBar onSelectPlace={handlePlaceSelect} />

      <div className="mt-6 border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
        <Map selectedLocation={selectedLocation} />
      </div>

      {selectedLocation && (
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Left: Place Details */}
    <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-500">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">📍 {selectedLocation.address.split(',')[0]}</h2>
      <p className="text-gray-600 mb-4">{selectedLocation.address}</p>

      <div className="flex gap-3">
         <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition">
          Add to Favorites ❤️
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 transition">
          Start Plan 📅
        </button>
      </div>
    </div>

    {/* Right: Weather */}
    <Weather lat={selectedLocation.lat} lng={selectedLocation.lng} />

  </div>
)}
    </div>
  );
};

export default Home;