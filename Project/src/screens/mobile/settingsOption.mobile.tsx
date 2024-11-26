import React from 'react';
import { View, Text, Switch, Button } from 'react-native';
import tailwind from 'twrnc';

const Settings: React.FC = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={tailwind`flex-1 justify-center items-center bg-[#FAF7F0]`}>
      <Text style={tailwind`text-2xl font-semibold mb-4`}>Settings</Text>
      <View style={tailwind`flex-row items-center mb-4`}>
        <Text style={tailwind`text-lg mr-2`}>Enable Notifications</Text>
        <Switch value={isEnabled} onValueChange={toggleSwitch} />
      </View>
      <Button title="Save Settings" onPress={() => alert('Settings Saved')} />
    </View>
  );
};

export default Settings;
