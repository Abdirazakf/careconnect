import React from 'react';
import { Box, HStack, Button } from 'native-base';

const Controls = () => {
  const sendCommand = async (command) => {
    try {
      await fetch('http://<your-ec2-ip>:5000/controls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });
      alert(`${command} command sent successfully!`);
    } catch (error) {
      alert('Failed to send command. Please try again.');
    }
  };

  return (
    <Box bg="white" shadow={2} borderRadius="lg" padding="4">
      <HStack space="4" justifyContent="center">
        <Button colorScheme="primary" onPress={() => sendCommand('play_lullaby')}>
          Play Lullaby
        </Button>
        <Button colorScheme="secondary" onPress={() => sendCommand('stop_lullaby')}>
          Stop Lullaby
        </Button>
      </HStack>
    </Box>
  );
};

export default Controls;
