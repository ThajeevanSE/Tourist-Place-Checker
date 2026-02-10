import React, { useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  
  const checkBackend = async () => {
    try {
      const response = await axios.get('/api/auth/register'); // Intentionally wrong method to test connection
      console.log(response);
    } catch (error) {
      // If we get a 404 or 405, it means we REACHED the server!
      // If we get "Network Error", the proxy is broken.
      console.log("Backend Connected:", error.response ? "Yes ✅" : "No ❌");
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold text-blue-600">Tourist Place Checker 🌍</h1>
      <button 
        onClick={checkBackend}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Backend Connection
      </button>
    </div>
  );
};

export default Home;