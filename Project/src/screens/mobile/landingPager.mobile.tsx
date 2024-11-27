import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import axios from 'axios';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

interface UserObject {
  id: string;
  name: string;
  email: string;
  picture: string;
}

const LandingScreen: React.FC = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<UserObject | null>(null);

  const handleSubmit = async () => {
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);
    try {
      const response = await axios.post('http://10.0.2.2:5001/user/login', { email, password });
      const data = response.data;
      if (data) {
        console.log("User logged in successfully:", data);
        navigation.navigate('MainScreenMobile', { user: data });

      } else {
        setErrorMessage('Invalid email or password.');
      }
    } catch (error: any) {
      console.error("Error during login:", error.message);
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setEmail('');
      setPassword('');
    }
  };

  const getUser = (user: any) => {
    axios
      .get('http://localhost:5000/user/getUser', {
        params: { user },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error('Error:', error));
  };

  const onSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const userProfile = parseJwt(credentialResponse.credential);
      if (userProfile) {
        setUser(userProfile);
        console.log('Login Success: current user:', userProfile);
      } else {
        console.error('Failed to parse user profile');
      }
    } else {
      console.error('No credential found');
    }
  };

  const onError = () => console.error('Login failed: An error occurred during authentication');

  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = decodeURIComponent(
        atob(base64Url)
          .split('')
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join('')
      );
      return JSON.parse(base64) as UserObject;
    } catch (e) {
      console.error('Failed to decode JWT:', e);
      return null;
    }
  };

  return (
      <View style={tw`flex-1 items-center justify-center bg-[#FAF7F0]`}>
        <View style={tw`w-11/12 rounded-lg p-6 bg-[#4A4947]`}>
          <Text style={tw`text-2xl font-bold text-center text-white mb-4`}>Sign In</Text>
          {errorMessage && <Text style={tw`text-red-500 text-center mb-4`}>{errorMessage}</Text>}
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
            <Text style={tw`text-white text-center font-bold`}>Submit</Text>
          </TouchableOpacity>
          <Text style={tw`text-center text-white`}>or</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={tw`mt-2`}>
            <Text style={tw`text-orange-400 text-center underline`}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </View>
        {user && (
          <View style={tw`mt-6 items-center`}>
            <Text style={tw`text-white text-xl`}>Welcome, {user.name}</Text>
          </View>
        )}
      </View>
  );
};

export default LandingScreen;
