// src/App.tsx (for mobile)
import React from 'react';
import { SafeAreaView } from 'react-native';
import Button from './components/mobile/Button.native'; // Mobile-specific import

const App = () => {
  const handlePress = () => {
    alert('Button pressed on mobile!');
  };

  return (
    <SafeAreaView>
      <Button title="Click Me" onPress={handlePress} />
    </SafeAreaView>
  );
};

export default App;
