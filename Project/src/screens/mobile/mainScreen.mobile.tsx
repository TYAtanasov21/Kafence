import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Button, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import tailwind from 'twrnc';
import TopBarMobile from "../../components/mobile/TopBar.mobile";

export const MainScreenMobile: React.FC = () => {
    const handleSignInPress = () => {
        alert("Sign in pressed.");
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

    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number } | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [rating, setRating] = useState(0);

    // Hardcoded coffee machine locations for demonstration
    const coffeeMachines = [
        { lat: 42.4975, lng: 27.4700, title: "Coffee Machine A", description: "Фердинандова 13", rating: 4.7, brand: "Lavazza" },
        { lat: 42.5000, lng: 27.4600, title: "Coffee Machine B", description: "ул. Мостова 7", rating: 4.5, brand: "Nespresso" },
        // Add more machines as needed
    ];

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

    const handleMarkerPress = (marker) => {
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
            <TopBarMobile title="Welcome to CoffeeApp" onSignInPress={handleSignInPress} />

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

            {/* Marker Details Modal */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={tailwind`flex-1 justify-center items-center bg-black bg-opacity-50`}>
                    <View style={tailwind`bg-white p-5 rounded w-4/5`}>
                        {selectedMarker && (
                            <>
                                <Text className="text-lg font-semibold">{selectedMarker.title}</Text>
                                <Text className="text-lg">{selectedMarker.description}</Text>
                                <Text className="text-lg">Рейтинг: {selectedMarker.rating} звезди</Text>
                                <Text className="text-lg">Марка на машината: {selectedMarker.brand}</Text>
                                <View style={tailwind`flex flex-row justify-between pt-5`}>
                                    <Button title="Rate" onPress={handleRate} />
                                    <TouchableOpacity
                                        onPress={() => {
                                            const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.lat},${selectedMarker.lng}&travelmode=walking`;
                                            Linking.openURL(url);
                                        }}
                                        style={tailwind`py-2 px-3 bg-green-400 rounded-md`}
                                    >
                                        <Text style={tailwind`text-white`}>Open in Google Maps</Text>
                                    </TouchableOpacity>
                                </View>
                                <Button title="Close" onPress={handleCloseModal} />
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
                <View style={tailwind`flex-1 justify-center items-center bg-black bg-opacity-50`}>
                    <View style={tailwind`bg-white p-5 rounded w-4/5`}>
                        <Text className="text-xl font-semibold mb-4">Оценете как беше кафето☕️</Text>
                        <View style={tailwind`flex flex-row justify-center mb-4`}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                    <Text className={`text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}>★</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Button title="Submit Rating" onPress={handleRatingSubmit} />
                        <Button title="Close" onPress={() => setRatingModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};
