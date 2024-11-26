import './styles/globals.css';
import React from 'react';
import { MainScreenMobile } from './screens/mobile/mainScreen.mobile';
import LandingScreen from './screens/mobile/landingPager.mobile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/mobile/register.mobile';
const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="MainScreenMobile"
          component={MainScreenMobile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
