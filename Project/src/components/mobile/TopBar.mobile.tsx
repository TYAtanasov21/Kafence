import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TopBarProps } from '../shared/TopBar'; // Adjust path if necessary

const TopBarMobile: React.FC<TopBarProps> = ({ title, onSignInPress }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 60, backgroundColor: '#6200ee', paddingHorizontal: 16 }}>
      <Image
        source={require('../../../assets/logo-web-page.png')} // Make sure this image path is correct
        style={{ width: 96, height: 40 }}
        resizeMode="contain"
      />

      {/* Title */}
      {title && (
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          {title}
        </Text>
      )}

      {/* Sign-In Icon */}
      <TouchableOpacity onPress={onSignInPress}>
        {/* Wrap the emoji in a Text component */}
        <Text style={{ color: 'white', fontSize: 24 }}>🔑</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopBarMobile;
