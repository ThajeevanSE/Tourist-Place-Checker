import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Trash2, Plus } from 'lucide-react';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [formData, setFormData] = useState({ title: '', startDate: '', endDate: '' });
  const [loading, setLoading] = useState(true);

  // Load trips on page load
  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/trips', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrips(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trips", error);
      setLoading(false);
    }
  };

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/trips', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Add new trip to list immediately
      setTrips([...trips, res.data]);
      setFormData({ title: '', startDate: '', endDate: '' }); // Reset form
      alert("Trip Created! ✈️");
    } catch (error) {
      alert("Error creating trip");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this trip plan?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/trips/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrips(trips.filter(t => t._id !== id));
    } catch (error) {
      alert("Error deleting trip");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Trip Plans 📅</h1>

      {/* 1. Create Trip Form */}
      <div className="bg-blue-50 p-6 rounded-xl shadow-md mb-10 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Plus size={20} /> Create New Trip
        </h2>
        <form onSubmit={handleCreateTrip} className="grid gap-4 md:grid-cols-2">
          <input 
            type="text" placeholder="Trip Name (e.g., Jaffna Holiday)" required
            className="p-2 border rounded col-span-2"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <input 
            type="date" required className="p-2 border rounded"
            value={formData.startDate}
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
          />
          <input 
            type="date" required className="p-2 border rounded"
            value={formData.endDate}
            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
          />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 col-span-2">
            Create Plan
          </button>
        </form>
      </div>

      {/* 2. Trip List */}
      {loading ? <p className="text-center">Loading trips...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.length === 0 && <p className="text-center col-span-3 text-gray-500">No trips planned yet.</p>}
          
          {trips.map((trip) => (
            <div key={trip._id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-gray-800">{trip.title}</h3>
              <div className="flex items-center gap-2 text-gray-600 mt-2 text-sm">
                <Calendar size={16} />
                {new Date(trip.startDate).toLocaleDateString()} — {new Date(trip.endDate).toLocaleDateString()}
              </div>
              <p className="text-gray-500 text-sm mt-2">{trip.places.length} places to visit</p>
              
              <div className="mt-4 flex justify-between items-center border-t pt-4">
                <button className="text-blue-600 font-semibold text-sm hover:underline">View Details →</button>
                <button 
                  onClick={() => handleDelete(trip._id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trips;