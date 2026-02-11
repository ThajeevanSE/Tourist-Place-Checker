import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const SearchBar = ({ onSelectPlace }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here if needed */
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (description) => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      onSelectPlace({ lat, lng, address: description, placeId: results[0].place_id });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Search a place (e.g., Sigiriya)"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {/* Suggestions List */}
      {status === "OK" && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="p-3 hover:bg-gray-100 cursor-pointer transition-colors"
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;