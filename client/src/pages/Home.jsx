import React, { useState, useContext } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import Weather from '../components/Weather';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TripSelector from '../components/TripSelector';
import { MapPin, Star, Plus } from 'lucide-react'; // Icons for the list

// 👇 IMPORTANT: Added 'marker' to libraries. This is required for your Map code to work!
const libraries = ['places', 'marker'];

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [touristPlaces, setTouristPlaces] = useState([]); // 👈 Store list of places
  const [placeToAdd, setPlaceToAdd] = useState(null); // 👈 Track which place to add (Main or from List)
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const addToFavorites = async () => {
    if (!user) {
      alert("Please login to save places!");
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/favorites', {
        placeId: selectedLocation.placeId || "unknown",
        name: selectedLocation.address.split(',')[0],
        address: selectedLocation.address,
        lat: selectedLocation.lat,
        lng: selectedLocation.lng
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Place added to favorites! ❤️");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error saving place");
    }
  };

  const handlePlaceSelect = (locationData) => {
    setSelectedLocation(locationData);
    setTouristPlaces([]); // Clear list on new search
  };

  // 👇 Handle opening modal for the MAIN search or a LIST item
  const openTripModal = (place = null) => {
    if (place) {
      // Adding from the list
      setPlaceToAdd({
        placeId: place.place_id,
        name: place.name,
        address: place.vicinity,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    } else {
      // Adding the main searched location
      setPlaceToAdd({
        placeId: selectedLocation?.placeId,
        name: selectedLocation?.address?.split(',')[0],
        address: selectedLocation?.address,
        lat: selectedLocation?.lat,
        lng: selectedLocation?.lng
      });
    }
    setIsTripModalOpen(true);
  };

  if (loadError) return <div className="p-4 text-center text-red-500">Error loading Maps</div>;
  if (!isLoaded) return <div className="p-4 text-center">Loading Google Maps...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Plan Your Next Trip ✈️
      </h1>

      <SearchBar onSelectPlace={handlePlaceSelect} />

      <div className="mt-6 border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
        {/* 👇 Pass callback to receive places */}
        <Map 
          selectedLocation={selectedLocation} 
          onPlacesFound={(places) => setTouristPlaces(places)} 
        />
      </div>

      {selectedLocation && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Place Details */}
          <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">📍 {selectedLocation.address.split(',')[0]}</h2>
            <p className="text-gray-600 mb-4">{selectedLocation.address}</p>

            <div className="flex gap-3">
              <button 
                onClick={addToFavorites} 
                className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
              >
                Add to Favorites ❤️
              </button>
              <button 
                onClick={() => openTripModal(null)} // Pass null to use selectedLocation
                className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 transition"
              >
                Add to Trip 📅
              </button>
            </div>
          </div>

          {/* Right: Weather */}
          <Weather lat={selectedLocation.lat} lng={selectedLocation.lng} />
        </div>
      )}

      {/* 👇 NEW SECTION: Tourist Places List */}
      {touristPlaces.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="text-red-500" /> Top Attractions Nearby
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {touristPlaces.map((place) => (
              <div key={place.place_id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 flex flex-col">
                {/* Image */}
                <div className="h-48 bg-gray-200 w-full overflow-hidden">
                  {place.photo ? (
                    <img src={place.photo} alt={place.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{place.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded text-xs font-bold text-yellow-700">
                      <Star size={12} fill="currentColor" /> {place.rating || "N/A"}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-grow">
                    {place.summary || place.vicinity}
                  </p>

                  <button 
                    onClick={() => openTripModal(place)} // Add specific place
                    className="w-full mt-auto bg-blue-50 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition flex items-center justify-center gap-2"
                  >
                    <Plus size={18} /> Add to Itinerary
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trip Selector Modal */}
      <TripSelector 
        isOpen={isTripModalOpen} 
        onClose={() => setIsTripModalOpen(false)} 
        placeData={placeToAdd} // Use the dynamic state
      />
    </div> 
  );
};

export default Home;