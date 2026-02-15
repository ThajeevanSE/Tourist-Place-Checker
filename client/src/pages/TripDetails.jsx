import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Trash2, Calendar, ArrowLeft } from 'lucide-react';

const TripDetails = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTripDetails();
  }, [id]);

  const fetchTripDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/trips/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrip(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trip", error);
      alert("Could not load trip");
      navigate('/trips'); // Go back if error
    }
  };

  const removePlace = async (placeId) => {
    if (!window.confirm("Remove this place from your itinerary?")) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`/api/trips/${id}/place/${placeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrip(res.data); // Update state with new trip data
    } catch (error) {
      alert("Error removing place");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading itinerary...</div>;
  if (!trip) return null;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <button onClick={() => navigate('/trips')} className="flex items-center text-gray-500 hover:text-blue-600 mb-4">
        <ArrowLeft size={20} className="mr-1" /> Back to Trips
      </button>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">{trip.title}</h1>
        <div className="flex items-center gap-2 opacity-90">
          <Calendar size={18} />
          <span>
            {new Date(trip.startDate).toLocaleDateString()} — {new Date(trip.endDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Places List */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <MapPin className="text-red-500" /> Itinerary ({trip.places.length} stops)
      </h2>

      {trip.places.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No places added yet.</p>
          <button onClick={() => navigate('/')} className="mt-2 text-blue-600 underline">
            Go search for places to add!
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {trip.places.map((place, index) => (
            <div key={place.placeId} className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                    Stop #{index + 1}
                  </span>
                  <h3 className="text-lg font-bold">{place.name}</h3>
                </div>
                <p className="text-gray-600 text-sm">{place.address}</p>
              </div>
              
              <button 
                onClick={() => removePlace(place.placeId)}
                className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition"
                title="Remove from trip"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripDetails;