import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
  width: '60%',
  height: '600px',
};

interface MachineProps {
  long: number;
  lat: number;
  name: string;
  id: number;
}

const mapId = '481bfcc0fdf44c5f';

const GoogleMapsComponent: React.FC = () => {
  
  const apiKey = "AIzaSyCuY-4rBKZ28zMvIkuAglx5G-P_o3nsnAc";
  console.log(apiKey);
  const MarkerIcon = "https://img.icons8.com/ios-filled/50/000000/coffee.png"; 

  const [selected, setSelected] = useState<MachineProps| null>(null); 
  const [isLoaded, setIsLoaded] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [machines, setMachines] = useState<MachineProps[]>([]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error obtaining location: ", error);
        }
      );
    }
  }, []);

  const handleMarkerClick = (machine: MachineProps) => {
    setSelected(machine);
  };

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get('http://localhost:5001/machine/getMachines');
        const machinesArray = response.data.array;
        setMachines(machinesArray);
      } catch (error) {
        console.log("Error fetching machines: ", error);
      }
    };

    fetchMachines();
  }, []);

  // Log the machines sate after it updates
  useEffect(() => {
    console.log(machines, "updated machines");
    if (machines.length > 0) { // Check if the machines array is not empty
      console.log(typeof Number(machines[0].lat)); // Now safe to access machines[0].lat
    } else {
      console.log("Machines array is empty."); // Log message for empty array
    }
  }, [machines]);
  const handleRate = () => {
    setRatingModalVisible(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleRatingSubmit = () => {
    alert(`You rated this machine: ${rating} stars`);
    setRatingModalVisible(false);
  };
  console.log(userLocation);

  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={handleLoad}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || { lat: 42.4975, lng: 27.4700 }}
          zoom={12}
          options={{ mapId: mapId }}
        >
          {userLocation && (
            <Marker 
            
              position={userLocation} 
              title="Your Location"
              icon={{
                url: "https://img.icons8.com/ios-filled/50/000000/user-location.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }} 
            />
          )}
          {
          machines && machines.length > 0 && machines.map((machine, index) => (
            <Marker 
              position={{ lat: Number(machine.lat), lng: Number(machine.long)}} 
              title="Coffee Machine"
              label="A"
              onClick={() => handleMarkerClick(machine)}
              icon={{
                url: MarkerIcon, 
                scaledSize: new window.google.maps.Size(40, 40),
              }} 
            />
          ))}
          {selected && (
            <InfoWindow
              position={{lat: Number(selected.lat), lng: Number(selected.long)}}
              onCloseClick={() => setSelected(null)} 
              options={{
                pixelOffset: new window.google.maps.Size(0, -30),
              }}
            >
              <div className="bg-white flex flex-col ">
                <div>
                  <h1 className="text-lg font-semibold">{selected.name}</h1>
                  <p className="text-lg">Рейтинг: 4.7 звезди (20)</p>
                  <p className="text-lg">Работи: 24 часа</p>
                </div>
                <div className="flex flex-row justify-between pt-5"> 
                  <p className="text-lg">🏃‍♂️ 5 минути пеша</p>
                  <button
                    onClick={() => {
                      if (selected) {
                        const lat = selected.lat;
                        const lng = selected.lng; 
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
                        window.open(url, '_blank');
                      }
                    }}
                    className="py-2 px-2 bg-green-400 border-none rounded-md cursor-pointer ml-10 mr-3"
                  >
                    <img
                      src="../../assets/google-maps-icon.png"
                      alt="Google maps logo"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </button>

                  <button 
                    onClick={handleRate} 
                    className="py-2 px-3 bg-my-purple text-white font-bold text-md border-none rounded-md cursor-pointer"
                  >
                    Rate
                  </button>
                </div>
              </div>
            </InfoWindow>
          )}

          {ratingModalVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-5 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Оценете как беше кафето☕️</h2>
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      className={`cursor-pointer text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`} 
                      onClick={() => setRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <button 
                  onClick={handleRatingSubmit} 
                  className="bg-my-purple text-white py-2 px-4 rounded mr-2"
                >
                  Запази
                </button>
                <button 
                  onClick={() => setRatingModalVisible(false)} 
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Затвори
                </button>
              </div>
            </div>
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default GoogleMapsComponent;
