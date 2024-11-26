import React from 'react';
import { View, Text, Button } from 'react-native';
import tailwind from 'twrnc';

const Profile: React.FC = () => {
  return (
    <View style={tailwind`flex-1 justify-center items-center bg-[#FAF7F0]`}>
      <Text style={tailwind`text-2xl font-semibold mb-4`}>Your Profile</Text>
      <Text style={tailwind`text-lg mb-4`}>Here you can view and edit your profile details.</Text>
      <Button title="Edit Profile" onPress={() => alert('Edit Profile Clicked')} />
    </View>
  );
};

export default Profile;
