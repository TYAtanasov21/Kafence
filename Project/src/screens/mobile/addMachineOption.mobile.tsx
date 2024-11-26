import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import tailwind from 'twrnc';

const AddMachine: React.FC = () => {
  const [machineName, setMachineName] = useState('');
  const [machineLocation, setMachineLocation] = useState('');

  const handleSubmit = () => {
    alert(`Machine Name: ${machineName}\nLocation: ${machineLocation}`);
  };

  return (
    <View style={tailwind`flex-1 justify-center items-center bg-[#FAF7F0]`}>
      <Text style={tailwind`text-2xl font-semibold mb-4`}>Add New Coffee Machine</Text>
      <TextInput
        style={tailwind`border-b-2 p-2 mb-4 w-3/4`}
        placeholder="Enter Machine Name"
        value={machineName}
        onChangeText={setMachineName}
      />
      <TextInput
        style={tailwind`border-b-2 p-2 mb-4 w-3/4`}
        placeholder="Enter Machine Location"
        value={machineLocation}
        onChangeText={setMachineLocation}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default AddMachine;
