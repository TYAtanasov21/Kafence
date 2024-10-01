import React from 'react';
import Button from './components/web/Button.web';
import Expo from 'expo'


const AppWeb = () => {
  const handlePress = () => {
    alert('Button pressed on web!');
  };

  return <Button title="Click Me" onPress={handlePress} />;
};

export default AppWeb;
