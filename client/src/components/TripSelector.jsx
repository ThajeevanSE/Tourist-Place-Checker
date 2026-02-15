import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const TripSelector = ({ isOpen, onClose, placeData }) => {
  const [trips, setTrips] = useState([]);
  
  useEffect(() => {
    if (isOpen) fetchTrips();
  }, [isOpen]);

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/trips', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrips(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToTrip = async (tripId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/trips/${tripId}/add`, {
        placeId: placeData.placeId || "unknown",
        name: placeData.name || placeData.address,
        address: placeData.address,
        lat: placeData.lat,
        lng: placeData.lng
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("Added to trip successfully! ✅");
      onClose(); // Close modal
    } catch (error) {
      alert(error.response?.data?.message || "Error adding to trip");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold mb-4">Add to which trip?</h2>
        <p className="text-sm text-gray-600 mb-4">Adding: <strong>{placeData?.name || placeData?.address}</strong></p>

        {trips.length === 0 ? (
          <p className="text-red-500">No trips found. Create one first!</p>
        ) : (
          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            {trips.map(trip => (
              <button 
                key={trip._id}
                onClick={() => addToTrip(trip._id)}
                className="p-3 text-left border rounded hover:bg-blue-50 hover:border-blue-300 transition"
              >
                <div className="font-semibold">{trip.title}</div>
                <div className="text-xs text-gray-500">
                  {new Date(trip.startDate).toLocaleDateString()}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripSelector;