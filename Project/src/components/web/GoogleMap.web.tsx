import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

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
  const MarkerIcon = "https://img.icons8.com/ios-filled/50/000000/coffee.png"; 

  const [selected, setSelected] = useState<MachineProps | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [machines, setMachines] = useState<MachineProps[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);

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

  const handleMarkerClick = (machine: MachineProps) => {
    setSelected(machine);
  };

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    // Initialize MarkerClusterer
    const markerCluster = new MarkerClusterer({
      map: map,
      markers: machines.map((machine) => 
        new google.maps.Marker({
          position: { lat: Number(machine.lat), lng: Number(machine.long) },
          icon: {
            url: MarkerIcon,
            scaledSize: new google.maps.Size(40, 40),
          },
          title: machine.name,
        })
      ),
    });
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={() => setIsLoaded(true)}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: 42.4975, lng: 27.4700 }}
          zoom={12}
          onLoad={onLoad}
          options={{ mapId }}
        >
          {selected && (
            <InfoWindow
              position={{ lat: Number(selected.lat), lng: Number(selected.long) }}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <h1>{selected.name}</h1>
                <p>Machine ID: {selected.id}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default GoogleMapsComponent;
