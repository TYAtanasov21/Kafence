import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Linking, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import tailwind from 'twrnc';
import TopBarMobile from "../../components/mobile/TopBar.mobile";
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
interface MachineProps {
  long: number;
  lat: number;
  name: string;
  id: number;
}

export const MainScreenMobile: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selected, setSelected] = useState<MachineProps | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [machines, setMachines] = useState<MachineProps[]>();
  const [currentRating, setCurrentRating] = useState<Number>(0);
  const [currentRatingCount, setCurrentRatingCount] = useState<Number>(0);

  const MarkerIcon = "https://img.icons8.com/?size=100&id=12860&format=png&color=000000"; 


  const getRating = async (machineId: number) =>{
    const response = await axios.post("https://kafence.vercel.app/machine/getRating", {"machineId": machineId});
    console.log(response.data);
    return response.data;
  }

  const handleRatingSubmit = async () => {
    alert(`You rated this machine (${selected.name}): ${rating} stars`);
    await axios.post("https://kafence.vercel.app/machine/rateMachine", {"machineId": selected.id, "rating": rating, "userId": user.id});
    setRatingModalVisible(false);
  };

  const handleMenuPress = () => {
    setMenuVisible(!menuVisible);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  const handleOptionPress = (option: string) => {
    setMenuVisible(false);
    switch (option) {
      case 'Profile':
        navigation.navigate('Profile');
        break;
      case 'Add a machine':
        navigation.navigate('AddMachine');
        break;
      case 'Settings':
        navigation.navigate('Settings');
        break;
      default:
        alert(`Option "${option}" not configured yet.`);
    }
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Добро утро";
    } else if (currentHour < 18) {
      return "Добър ден";
    } else {
      return "Добър вечер";
    }
  };

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
  const handleMarkerPress = async (machine: MachineProps) => {
    try {
      setSelected(machine);
  
      // Uncommenting this section should work if the API call is correct.
      const response = await getRating(machine.id);
      console.log(response);
  
      const avg = Number(response.rating.avg);
      const count = Number(response.count.count);
  
      setCurrentRating(avg);
      setCurrentRatingCount(count);
  
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
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
  }, [machines]);

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelected(null);
  };

  const handleRate = () => {
    setRatingModalVisible(true);
  };


  return (
    <View style={tailwind`flex flex-1 bg-[#FAF7F0]`}>
      <TopBarMobile title="Welcome to CoffeeApp" onButtonPress={handleMenuPress} />

      <Text style={tailwind`text-lg text-center my-4 font-bold`}>
        {getGreeting()}, {user.username}!
      </Text>

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 42.5048,
          longitude: 27.4626,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userLocation && (
          <Marker
            coordinate={{ latitude: userLocation.lat, longitude: userLocation.lng }}
            title="Your Location"
            pinColor="blue"
          />
        )}
      {
        machines && machines.length > 0 && machines.map((machine, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: Number(machine.lat), longitude: Number(machine.long) }}
            onPress={() => {handleMarkerPress(machine)}}
            image = {{
              uri: MarkerIcon
            }}
          />
        ))}
        
      </MapView>

      {/* Menu Dropdown */}
      {menuVisible && (
        <Modal
          visible={menuVisible}
          transparent={true}
          onRequestClose={handleCloseMenu}
        >
          <TouchableOpacity
            style={tailwind`absolute inset-0`}
            onPress={handleCloseMenu}
            activeOpacity={1}
          >
            <View style={tailwind`absolute right-11 top-18 bg-white rounded-md shadow-lg p-2 w-40`}>
              {['Profile', 'Add a machine', 'Settings'].map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={tailwind`py-2 ${index < 2 ? 'border-b border-gray-200' : ''}`}
                  onPress={() => handleOptionPress(option)}
                >
                  <Text style={tailwind`text-center text-lg`}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {/* Marker Details Modal */}
      
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={tailwind`flex-1 justify-center items-center bg-black bg-opacity-20 z-10 rounded`}>
          <View style={tailwind`bg-white p-5 rounded w-4/5`}>
            {selected && (
              <>
                <View style={tailwind`flex flex-row justify-between`}>
                  <Text style={tailwind`text-lg font-semibold`}>{selected.name}</Text>
                  <TouchableOpacity onPress={handleCloseModal} style={tailwind`justify-center items-center`}>
                    <Entypo name="cross" size={35} color="black" />
                  </TouchableOpacity>
                </View>
                <Text style={tailwind`text-lg`}>Рейтинг: {currentRating}
                  <Text 
                        style={tailwind`text-xl text-yellow-500 rounded-md`} 
                      >
                        ★
                  </Text>
                  ({currentRatingCount})
                  </Text>
                <View style={tailwind`flex flex-row justify-between pt-5`}>
                  <TouchableOpacity
                    onPress={() => {
                      const url = `https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.long}&travelmode=walking`;
                      Linking.openURL(url);
                    }}
                    style={tailwind`py-2 px-3 bg-green-400 rounded-md`}
                  >
                    <Text style={tailwind`text-white`}>Open in Google Maps</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleRate}
                    style={tailwind`py-2 px-3 rounded-md bg-[#8181FF]`}
                  >
                    <Text style={tailwind`text-white text-md font-semibold`}>Rate</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Rating Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={ratingModalVisible}
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <View style={tailwind`flex-1 justify-center items-center bg-black bg-opacity-30 z-50`}>
          <View style={tailwind`flex flex-col bg-white p-5 rounded w-4/5`}>
            <Text style={tailwind`text-xl font-semibold mb-4`}>Оценете как беше кафето☕️</Text>
            <View style={tailwind`flex flex-row justify-center mb-4`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Text style={tailwind`text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}>★</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={tailwind`flex flex-row justify-between`}>
              <TouchableOpacity
                onPress={() => setRatingModalVisible(false)}
                style={tailwind`px-2 py-3 bg-rose-500 rounded-md`}
              >
                <Text style={tailwind`text-white`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleRatingSubmit}
                style={tailwind`px-2 py-3 bg-green-500 rounded-md`}
              >
                <Text style={tailwind`text-white`}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
