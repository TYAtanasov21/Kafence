import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';

const AddMachine: React.FC = () => {
  const [machineName, setMachineName] = useState('');
  const [machineLocation, setMachineLocation] = useState('');
  const [machineBrand, setMachineBrand] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const formData = {
      address: machineLocation,
      brand: machineBrand,
      name: machineName,
      email: userEmail,
    };

    fetch('https://formspree.io/f/mwpklgkq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setSubmitted(true);
          setMachineName('');
          setMachineLocation('');
          setMachineBrand('');
          setUserEmail('');
          Alert.alert('Success', 'Form submitted successfully!');
        } else {
          Alert.alert('Error', 'There was an issue sending your message. Please try again.');
        }
      })
      .catch(() => Alert.alert('Error', 'There was an error sending the email.'));
  };

  return (
    <View style={tailwind`flex-1 justify-center items-center bg-[#FAF7F0]`}>
      <Text style={tailwind`text-2xl font-semibold mb-4`}>Add New Coffee Machine</Text>

      {submitted && (
        <Text style={tailwind`text-green-500 text-center mb-4`}>
          Form submitted successfully!
        </Text>
      )}

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
      <TextInput
        style={tailwind`border-b-2 p-2 mb-4 w-3/4`}
        placeholder="Enter Your Email"
        value={userEmail}
        onChangeText={setUserEmail}
      />
      <TextInput
        style={tailwind`border-b-2 p-2 mb-4 w-3/4`}
        placeholder="Enter the Machine Brand"
        value={machineBrand}
        onChangeText={setMachineBrand}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={tailwind`bg-[#8181FF] rounded-md p-3`}
      >
        <Text style={tailwind`text-white font-semibold`}>Изпращане на запитване</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddMachine;
