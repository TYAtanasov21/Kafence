import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { Image } from 'react-native';
import tailwind from 'twrnc';
import { useNavigate } from 'react-router-dom';
import { MarkerClusterer } from '@react-google-maps/api';
import clustererOptions from '../shared/clusturerOptions';

import {User} from "../shared/user";
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

interface GoogleMapsComponentProps {
  user: User;
}

const GoogleMapsComponent: React.FC<GoogleMapsComponentProps> = ({user}) => {
  
  const apiKey = process.env.GOOGLE_MAPS_API;
  console.log(apiKey);
  const MarkerIcon = "https://img.icons8.com/?size=100&id=12860&format=png&color=000000"; 
  const navigate = useNavigate();
  const [selected, setSelected] = useState<MachineProps| null>(null); 
  const [isLoaded, setIsLoaded] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState<Number>(0);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [machines, setMachines] = useState<MachineProps[]>([]);
  const [currentRating, setCurrentRating] = useState<Number>(0);
  const [currentRatingCount, setCurrentRatingCount] = useState<Number>(0);

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

  const handleMarkerClick = async (machine: MachineProps) => {
    setSelected(machine);
    const response = await getRating(machine.id);
    console.log(response);
    const avg = Number(response.rating.avg);
    const count = Number(response.count.count);

    setCurrentRating(avg);
    setCurrentRatingCount(count);
  };

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get('https://kafence.vercel.app/machine/getMachines');
        const machinesArray = response.data.array;
        setMachines(machinesArray);
      } catch (error) {
        console.log("Error fetching machines: ", error);
      }
    };

    fetchMachines();
  }, []);

  useEffect(() => {
    console.log(machines, "updated machines");
    if (machines.length > 0) {
      console.log(typeof Number(machines[0].lat));
    } else {
      console.log("Machines array is empty.");
    }
  }, [machines]);
  const handleRate = () => {
    if(user)
    setRatingModalVisible(true);
    else navigate("/login/");
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const getRating = async (machineId: number) =>{
    const response = await axios.post("https://kafence.vercel.app/machine/getRating", {"machineId": machineId});
    console.log(response.data);
    return response.data;
  }

  const handleRatingSubmit = async () => {
    alert(`You rated this machine (${selected.name}): ${rating} stars`);
    await axios.post("https://kafence.vercel.app/machine/rateMachine", {"machineId": selected.id, "rating": rating});
    setRatingModalVisible(false);
  };
  console.log(userLocation);


  const renderMarkers = (clusterer) => {
    return (
      machines &&
      machines.length > 0 &&
      machines.map((machine) => (
        <Marker
          key={machine.id}
          position={{ lat: Number(machine.lat), lng: Number(machine.long) }}
          title="Coffee Machine"
          onClick={() => handleMarkerClick(machine)}
          icon={{
            url: MarkerIcon,
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          clusterer={clusterer}
        />
      ))
    );
  };

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

          <MarkerClusterer options={clustererOptions}>
            {(clusterer) => renderMarkers(clusterer)}
          </MarkerClusterer>

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
                  <h1 className="text-lg font-semibold">{selected?.name}</h1>
                  <p className="text-lg">Рейтинг: {currentRating} 
                      <span 
                        className={`text-xl text-yellow-500 rounded-md`} 
                      >
                        ★
                      </span>
                    ({currentRatingCount})</p>
                  <p className="text-lg">Работи: 24 часа</p>
                </div>
                <div className="flex flex-row justify-between pt-5"> 
                  <p className="text-lg">🏃‍♂️ 5 минути пеша</p>
                  <button
                    onClick={() => {
                      if (selected) {
                        const lat = selected.lat;
                        const lng = selected.long; 
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
                        window.open(url, '_blank');
                      }
                    }}
                    className="py-2 px-2 bg-green-400 border-none rounded-md cursor-pointer ml-10 mr-3"
                  >
                    <div className = "">
                    <Image 
                    source = {require('../../../assets/google-maps-icon.png')}
                    style = {tailwind`w-5 h-5`}
                    />
                    </div>
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