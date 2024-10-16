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
  const MarkerIcon = "https://img.icons8.com/ios-filled/50/000000/coffee.png"; 

  const [selected, setSelected] = useState<google.maps.LatLng | null>(null); 
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMarkerClick = (position: google.maps.LatLng) => {
    setSelected(position);
  };

  const handleRate = () => {
    alert("Button clicked!");
  };

  const handleMapsButtonClicked = () => {
    alert("Google maps button clicked!");
  }
  const handleLoad = () => {
    setIsLoaded(true);
  };

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
              <div className = "bg-white flex flex-col ">
                <div>
                  <h1 className = "text-lg font-semibold">Фердинандова 13</h1>
                  <p className = "text-lg">Рейтинг: 4.7 звезди (20)</p>
                  <p className = "text-lg">Работи: 24 часа</p>
                  <p className = "text-lg">Марка на машината: Lavazza</p>
                </div>
                <div className = "flex flex-row justify-between pt-5"> 
                <p className = "text-lg ">🏃‍♂️ 5 минути пеша</p>
                <button 
                  onClick={handleMapsButtonClicked} 
                  className = "py-2 px-2 bg-green-400 border-none rounded-md cursor-pointer  ml-10 mr-3"
                  >
                  <img
                    src="../../assets/google-maps-icon.png"
                    alt="Google maps logo"
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>
                <button 
                  onClick={handleRate} 
                  className = "py-2 px-3 bg-my-purple text-white font-bold text-md border-none rounded-md cursor-pointer"
                  >
                  Rate
                </button>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default GoogleMapsComponent;
