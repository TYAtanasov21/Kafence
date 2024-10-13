import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '60%',
  height: '600px',
};

const center = {
  lat: 42.4975,
  lng: 27.4700,
};

const mapId = '481bfcc0fdf44c5f';



const GoogleMapsComponent: React.FC = () => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const MarkerIcon = "https://img.icons8.com/ios-filled/50/000000/coffee.png"; // Coffee icon

  const [selected, setSelected] = useState<google.maps.LatLng | null>(null); // State to manage selected marker
  const [isLoaded, setIsLoaded] = useState(false); // State to check if Google Maps is loaded

  const handleMarkerClick = (position: google.maps.LatLng) => {
    setSelected(position);
  };

  const handleButtonClick = () => {
    alert("Button clicked!"); // Replace this with your desired action
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };
  console.log(process.env.GOOGLE_MAPS_API);

  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={handleLoad}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
          options={{ mapId: mapId }}
        >
          <Marker 
            position={center} 
            title="My Marker"
            label="A"
            onClick={() => handleMarkerClick(center)}
            icon={{
              url: MarkerIcon, // Ensure this is a valid image URL
              scaledSize: (window.google && window.google.maps) 
                ? new window.google.maps.Size(40, 40) 
                : { width: 40, height: 40 }, // Fallback if Google Maps is not available
            }} 
          />

          {selected && (
            <InfoWindow
              position={selected}
              onCloseClick={() => setSelected(null)} // Close info window
              options={{
                pixelOffset: new window.google.maps.Size(0, -30), // Adjust position above marker
              }}
            >
              <div className = "bg-slate-600">
                <h2>Marker Info</h2>
                <p>Details about the marker.</p>
                <button onClick={handleButtonClick} style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Click Me
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default GoogleMapsComponent;
