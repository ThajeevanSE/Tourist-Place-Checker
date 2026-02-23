import React, { useCallback, useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const defaultCenter = {
  lat: 6.9271, // Colombo
  lng: 79.8612
};

//Added onPlacesFound prop
const Map = ({ selectedLocation, onPlacesFound }) => {
  const [map, setMap] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  
  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Use the selected location or default
  const center = selectedLocation || defaultCenter;

  useEffect(() => {
    if (map && selectedLocation) {
      // CLEAR previous results first
      setNearbyPlaces([]);

      const fetchNearby = async () => {
        try {
          const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
          const { Place } = await google.maps.importLibrary("places");

          if (!Place || !Place.searchNearby) {
             console.warn("New Places API not available, trying legacy...");
             const service = new window.google.maps.places.PlacesService(map);
             service.nearbySearch({
               location: selectedLocation,
               radius: 5000,
               type: ['tourist_attraction']
             }, (results, status) => {
               if (status === 'OK') setNearbyPlaces(results);
             });
             return;
          }

          // MODERN SEARCH
          const request = {
            // Added 'photos' and 'editorialSummary' here
            fields: ['displayName', 'location', 'rating', 'userRatingCount', 'id', 'formattedAddress', 'photos', 'editorialSummary'],
            locationRestriction: {
              center: selectedLocation,
              radius: 5000, // 5km
            },
            includedPrimaryTypes: ['tourist_attraction', 'historical_landmark', 'museum', 'park'],
            maxResultCount: 15,
          };

          const { places } = await Place.searchNearby(request);
          
          if (places && places.length > 0) {
            console.log("Found modern places:", places.length);
            
            const formattedPlaces = places.map(p => ({
              place_id: p.id,
              geometry: { location: p.location },
              name: p.displayName,
              rating: p.rating,
              user_ratings_total: p.userRatingCount,
              vicinity: p.formattedAddress,
              //Get Photo and Summary
              photo: p.photos && p.photos.length > 0 ? p.photos[0].getURI({ maxWidth: 400 }) : null,
              summary: p.editorialSummary
            }));
            
            setNearbyPlaces(formattedPlaces);

            //Send data back to Home.jsx
            if (onPlacesFound) {
              onPlacesFound(formattedPlaces);
            }
          }
        } catch (error) {
          console.error("Error fetching nearby places:", error);
        }
      };

      fetchNearby();
    }
  }, [map, selectedLocation]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={selectedLocation ? 14 : 10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: "DEMO_MAP_ID" }} 
    >
      {/* 1. Main Marker */}
      {selectedLocation && (
        <Marker 
          position={selectedLocation} 
          title="Your Destination"
        />
      )}

      {/* 2. Nearby Markers */}
      {nearbyPlaces.map((place) => (
        <Marker
          key={place.place_id}
          position={place.geometry.location}
          // Simple red icon
          icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
          onClick={() => setSelectedMarker(place)}
        />
      ))}

      {/* 3. Info Window */}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.geometry.location}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div className="p-2 min-w-[150px] max-w-xs">
            <h3 className="font-bold text-sm mb-1">{selectedMarker.name}</h3>
            {selectedMarker.photo && (
              <img src={selectedMarker.photo} alt="View" className="w-full h-24 object-cover mb-2 rounded" />
            )}
            <p className="text-xs text-gray-600 mb-1">{selectedMarker.summary || selectedMarker.vicinity}</p>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500 text-xs">⭐</span>
              <span className="text-xs font-medium">
                {selectedMarker.rating || "N/A"} ({selectedMarker.user_ratings_total || 0})
              </span>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default React.memo(Map);