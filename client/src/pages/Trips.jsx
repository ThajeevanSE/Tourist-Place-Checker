import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Trash2, Plus, Sparkles, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Standard Form State
  const [formData, setFormData] = useState({ title: '', startDate: '', endDate: '' });
  
  // AI Form State
  const [showAIForm, setShowAIForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiForm, setAiForm] = useState({ destination: '', days: 3, vibe: 'relaxing', startDate: '' });

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

  // --- 1. Standard Manual Trip Creation ---
  const handleCreateTrip = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/trips', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrips([...trips, res.data]);
      setFormData({ title: '', startDate: '', endDate: '' });
      alert("Trip Created! ✈️");
    } catch (error) {
      alert("Error creating trip");
    }
  };

  // --- 2. MAGIC AI TRIP CREATION ✨ ---
  const handleAIGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Step A: Ask Gemini to generate the itinerary
      const aiRes = await axios.post('/api/ai/generate', {
        destination: aiForm.destination,
        days: Number(aiForm.days),
        vibe: aiForm.vibe
      }, { headers });

      const generatedData = aiRes.data; // Gets { title, places }

      // Step B: Calculate End Date based on how many days they selected
      const start = new Date(aiForm.startDate);
      const end = new Date(start);
      end.setDate(end.getDate() + Number(aiForm.days) - 1);

      // Step C: Create the Trip Container in database
      const tripRes = await axios.post('/api/trips', {
        title: `✨ AI: ${generatedData.title}`,
        startDate: start.toISOString(),
        endDate: end.toISOString()
      }, { headers });

      const newTripId = tripRes.data._id;

      // Step D: Loop through AI places and save them into the new trip
      for (let i = 0; i < generatedData.places.length; i++) {
        const place = generatedData.places[i];
        await axios.post(`/api/trips/${newTripId}/add`, {
          placeId: `ai-gen-${Date.now()}-${i}`, // Fake ID since it's AI generated
          name: place.name,
          address: place.address,
          lat: 0,
          lng: 0
        }, { headers });
      }

      alert("Magic Trip Generated Successfully! 🪄");
      setShowAIForm(false);
      fetchTrips(); // Refresh the list to show the new trip

    } catch (error) {
      console.error(error);
      alert("Failed to generate AI Trip. Check backend console for errors.");
    } finally {
      setIsGenerating(false);
    }
  };

  // --- 3. Delete Trip ---
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
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Trip Plans 📅</h1>
        
        {/* Toggle AI Form Button */}
        <button 
          onClick={() => setShowAIForm(!showAIForm)}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition flex items-center gap-2"
        >
          <Sparkles size={18} /> {showAIForm ? "Standard Planner" : "Use AI Planner"}
        </button>
      </div>

      {/* --- FORM SECTION --- */}
      {showAIForm ? (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-6 rounded-xl shadow-md mb-10 border border-purple-200">
          <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            <Wand2 size={24} /> Magic AI Itinerary Generator
          </h2>
          <p className="text-purple-600 mb-4 text-sm">Tell Gemini where you want to go, and it will build a complete day-by-day plan for you!</p>
          
          <form onSubmit={handleAIGenerate} className="grid gap-4 md:grid-cols-4">
            <input 
              type="text" placeholder="Where to? (e.g., Kandy, Paris)" required
              className="p-3 border border-purple-300 rounded md:col-span-2 focus:ring-2 focus:ring-purple-400 outline-none"
              value={aiForm.destination}
              onChange={(e) => setAiForm({...aiForm, destination: e.target.value})}
            />
            <input 
              type="number" min="1" max="14" placeholder="Days (e.g., 3)" required
              className="p-3 border border-purple-300 rounded focus:ring-2 focus:ring-purple-400 outline-none"
              value={aiForm.days}
              onChange={(e) => setAiForm({...aiForm, days: e.target.value})}
            />
            <select 
              className="p-3 border border-purple-300 rounded focus:ring-2 focus:ring-purple-400 outline-none bg-white"
              value={aiForm.vibe}
              onChange={(e) => setAiForm({...aiForm, vibe: e.target.value})}
            >
              <option value="relaxing">Relaxing & Chill</option>
              <option value="adventure">Adventure & Hiking</option>
              <option value="history">History & Culture</option>
              <option value="family">Family Friendly</option>
            </select>
            
            <div className="md:col-span-2 flex items-center gap-2">
              <span className="font-semibold text-purple-800">Start Date:</span>
              <input 
                type="date" required className="p-2 border border-purple-300 rounded flex-grow"
                value={aiForm.startDate}
                onChange={(e) => setAiForm({...aiForm, startDate: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={isGenerating}
              className="md:col-span-2 bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isGenerating ? "Gemini is thinking... 🧠" : "Generate My Trip ✨"}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-blue-50 p-6 rounded-xl shadow-md mb-10 border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
            <Plus size={20} /> Create Manual Trip
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
            <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 col-span-2 font-bold">
              Create Empty Plan
            </button>
          </form>
        </div>
      )}

      {/* --- LIST SECTION --- */}
      {loading ? <p className="text-center mt-10 text-gray-500 text-xl">Loading trips...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.length === 0 && <p className="text-center col-span-3 text-gray-500">No trips planned yet.</p>}
          
          {trips.map((trip) => (
            <div key={trip._id} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 hover:shadow-xl transition flex flex-col">
              <h3 className="text-xl font-bold text-gray-800">{trip.title}</h3>
              <div className="flex items-center gap-2 text-gray-600 mt-2 text-sm">
                <Calendar size={16} />
                {new Date(trip.startDate).toLocaleDateString()} — {new Date(trip.endDate).toLocaleDateString()}
              </div>
              <p className="text-gray-500 text-sm mt-2 font-medium bg-gray-100 w-max px-2 py-1 rounded">
                {trip.places.length} places to visit
              </p>
              
              <div className="mt-auto pt-6 flex justify-between items-center">
                <button 
                  onClick={() => navigate(`/trips/${trip._id}`)}
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded font-semibold text-sm hover:bg-blue-600 hover:text-white transition"
                >
                  View Itinerary
                </button>
                <button 
                  onClick={() => handleDelete(trip._id)}
                  className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition"
                >
                  <Trash2 size={20} />
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