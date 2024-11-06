import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Linking, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import tailwind from 'twrnc';
import TopBarMobile from "../../components/mobile/TopBar.mobile";
import Entypo from '@expo/vector-icons/Entypo';


interface CoffeeMachine {
    lat: number;
    lng: number;
    title: string;
    description: string;
    rating: number;
    brand: string;
}

export const MainScreenMobile: React.FC = () => {
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<CoffeeMachine | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [menuVisible, setMenuVisible] = useState(false);

    const coffeeMachines: CoffeeMachine[] = [
        { lat: 42.4975, lng: 27.4700, title: "Coffee Machine A", description: "Фердинандова 13", rating: 4.7, brand: "Lavazza" },
        { lat: 42.5000, lng: 27.4600, title: "Coffee Machine B", description: "ул. Мостова 7", rating: 4.5, brand: "Nespresso" },
    ];

    const handleMenuPress = () => {
        setMenuVisible(!menuVisible);
    };

    const handleCloseMenu = () => {
        setMenuVisible(false);
    };

    const handleOptionPress = (option: string) => {
        alert(`Selected: ${option}`);
        setMenuVisible(false);
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

    const handleMarkerPress = (marker: CoffeeMachine) => {
        setSelectedMarker(marker);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedMarker(null);
    };

    const handleRate = () => {
        setRatingModalVisible(true);
    };

    const handleRatingSubmit = () => {
        alert(`You rated this machine: ${rating} stars`);
        setRatingModalVisible(false);
    };

    return (
        <View style={tailwind`flex flex-1 bg-[#FAF7F0]`}>
            <TopBarMobile title="Welcome to CoffeeApp" onButtonPress={handleMenuPress} />

            <Text style={tailwind`text-lg text-center my-4 font-bold`}>
                {getGreeting()}, Тодор!
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

                {coffeeMachines.map((machine, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: machine.lat, longitude: machine.lng }}
                        title={machine.title}
                        description={machine.description}
                        onPress={() => handleMarkerPress(machine)}
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
                        activeOpacity={1} // Ensures pressing the overlay triggers closing
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
                        {selectedMarker && (
                            <>
                            <View style = {tailwind`flex flex-row justify-between`}>
                                <Text style={tailwind`text-lg font-semibold`}>{selectedMarker.title}</Text>
                                <TouchableOpacity onPress={handleCloseModal} style = {tailwind`justify-center items-center`}>
                                    <Entypo name="cross" size={35} color="black" />
                                </TouchableOpacity>
                            </View>
                                <Text style={tailwind`text-lg`}>{selectedMarker.description}</Text>
                                <Text style={tailwind`text-lg`}>Рейтинг: {selectedMarker.rating} звезди</Text>
                                <Text style={tailwind`text-lg`}>Марка на машината: {selectedMarker.brand}</Text>
                                <View style={tailwind`flex flex-row justify-between pt-5`}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.lat},${selectedMarker.lng}&travelmode=walking`;
                                            Linking.openURL(url);
                                        }}
                                        style={tailwind`py-2 px-3 bg-green-400 rounded-md`}
                                    >
                                        <Text style={tailwind`text-white`}>Open in Google Maps</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                        onPress={handleRate}
                                        style = {tailwind`py-2 px-3 rounded-md bg-[#8181FF]`}
                                    >
                                        <Text style = {tailwind`text-white text-md font-semibold`}>Rate</Text>
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
                        <View style = {tailwind`flex flex-row justify-between`}>
                        {/* <Button title="Close" onPress={() => setRatingModalVisible(false)}/>
                        <Button title="Submit Rating" onPress={handleRatingSubmit} /> */}
                        <TouchableOpacity 
                        onPress = {() => setRatingModalVisible(false)}
                        style = {tailwind`px-2 py-3 bg-rose-500 rounded-md`}>
                            <Text style = {tailwind`text-md text-white justify-center items-center`}> Close</Text>
                        </TouchableOpacity>

                        
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
