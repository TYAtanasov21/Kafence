import './styles/globals.css';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

const App: React.FC = () => {
  const handlePress = () => {
    Alert.alert('Button pressed!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My React Native App!</Text>
      <Button title="Press Me" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
