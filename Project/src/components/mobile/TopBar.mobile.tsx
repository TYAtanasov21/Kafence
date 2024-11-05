import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TopBarProps } from '../shared/TopBar';
import tailwind from 'twrnc';
import Entypo from '@expo/vector-icons/Entypo';

const TopBarMobile: React.FC<TopBarProps> = ({ title, onSignInPress }) => {
  return (
    <View style={tailwind`flex flex-row items-center justify-between pt-12 px-3 w-full`}>
      <Image
        source={require('../../../assets/logo-web-page.png')}
        style={{ width: 150, height: 62 }}
        resizeMode="contain"
      />

      <TouchableOpacity onPress={onSignInPress} style={tailwind`justify-center`}>
        <Entypo name = "menu" size={37} />
      </TouchableOpacity>
    </View>
  );
};

export default TopBarMobile;
