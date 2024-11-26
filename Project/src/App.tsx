import './styles/globals.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from './screens/mobile/profileOption.mobile';
import AddMachine from './screens/mobile/addMachineOption.mobile';
import Register from './screens/mobile/register.mobile';
import LandingScreen from './screens/mobile/landingPager.mobile';
import { MainScreenMobile } from './screens/mobile/mainScreen.mobile';
import Settings from './screens/mobile/settingsOption.mobile';

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
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="AddMachine"
          component={AddMachine}
          options={{ headerShown: false }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
