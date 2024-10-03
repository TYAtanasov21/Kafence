import React from 'react';
import TopBarMobile from "../components/mobile/TopBar.mobile";
import {View} from 'react-native'

export const MainScreenMobile:React.FC = () => {
    const handleSignInPress = () => {
        alert("Sign in pressed.");
        };
    
      return (
        <View style={{ flex: 1, backgroundColor: '#f3f4f6', padding: 20 }}>
          <TopBarMobile title="Welcome to CoffeeApp" onSignInPress={handleSignInPress} />
        </View>
      );
}

