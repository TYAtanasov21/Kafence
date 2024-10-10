import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';



const mapContainerStyle = {
  width: '60%',
  height: '600px',
};

const center = {
  lat: 42.4975,
  lng: 27.4700,
};

const GoogleMapsComponent: React.FC = () => {
  const apiKey = process.env.GOOGLE_MAPS_API;  
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
      />
    </LoadScript>
  );
};

export default GoogleMapsComponent;
