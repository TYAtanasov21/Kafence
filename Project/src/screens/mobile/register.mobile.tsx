import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const Register: React.FC = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setErrorMessage('');
    if (!name || !email || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    console.log('Registration Data:', { name, email, password });

    const userData = { name, email, password };
    console.log('User Registered:', userData);
    const response = await axios.post("http://10.0.2.2:5001/user/register", {username: userData.name, email: userData.email, password: userData.password} );

    const responseLogin = await axios.post('http://10.0.2.2:5001/user/login', { email: userData.email, password: userData.password });
    const data = responseLogin.data;
    if (data) {
      console.log("User logged in successfully:", data);
      navigation.navigate('MainScreenMobile', { user: data });
    }
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-[#FAF7F0]`}>
      <View style={tw`w-11/12 rounded-lg p-6 bg-[#4A4947]`}>
        <Text style={tw`text-2xl font-bold text-center text-white mb-4`}>Register</Text>
        {errorMessage && <Text style={tw`text-red-500 text-center mb-4`}>{errorMessage}</Text>}
        
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={tw`w-full bg-white p-3 rounded-md mb-3`}
        />
        
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={tw`w-full bg-white p-3 rounded-md mb-3`}
        />
        
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={tw`w-full bg-white p-3 rounded-md mb-4`}
        />
        
        <TouchableOpacity
          onPress={handleSubmit}
          style={tw`bg-[#B17457] py-2 rounded-md w-full mb-4`}
        >
          <Text style={tw`text-white text-center font-bold`}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={tw`mt-2`}>
          <Text style={tw`text-orange-400 text-center underline`}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
