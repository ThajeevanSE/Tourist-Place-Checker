import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, MapPin } from 'lucide-react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorites", error);
      setLoading(false);
    }
  };

  const removeFavorite = async (placeId) => {
    if (!window.confirm("Remove this place?")) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/favorites/${placeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update UI immediately (remove item from list)
      setFavorites(favorites.filter(fav => fav.placeId !== placeId));
    } catch (error) {
      alert("Error removing favorite");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading your list...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Saved Places ❤️</h1>
      
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorites yet. Go search for some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((fav) => (
            <div key={fav.placeId} className="bg-white p-4 rounded-lg shadow-md border hover:shadow-lg transition">
              <h2 className="text-xl font-bold text-blue-600 mb-2">{fav.name}</h2>
              <p className="text-gray-600 text-sm flex items-start gap-2 mb-4">
                <MapPin size={16} className="mt-1" />
                {fav.address}
              </p>
              
              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <span className="text-xs text-gray-400">Added to list</span>
                <button 
                  onClick={() => removeFavorite(fav.placeId)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-semibold"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;