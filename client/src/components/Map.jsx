import React, { useCallback, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const defaultCenter = {
  lat: 6.9271, // Colombo
  lng: 79.8612
};

const Map = ({ selectedLocation }) => {
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const center = selectedLocation || defaultCenter;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={selectedLocation ? 14 : 10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {selectedLocation && <Marker position={selectedLocation} />}
    </GoogleMap>
  );
};

export default React.memo(Map);