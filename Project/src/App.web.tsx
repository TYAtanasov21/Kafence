import React from 'react';
import Button from './components/web/Button.web';

const App = () => {
  const handlePress = () => {
    alert('Button pressed on web!');
  };

  return <Button title="Click Me" onPress={handlePress} />;
};

export default App;
