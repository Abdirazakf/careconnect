import React from 'react';
import { Box, VStack, Heading, Text, HStack, Button } from 'native-base';
import { Video } from 'expo-av';
import { moderateScale } from 'react-native-size-matters';

const Dashboard = () => {
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
    <Box flex={1} bg="primary.50" padding={moderateScale(16)}>
      <VStack space={moderateScale(16)}>
        {/* Title Section */}
        <Heading color="primary.500" fontSize={moderateScale(20)}>
          Dashboard
        </Heading>
        <Text fontSize={moderateScale(14)} color="primary.800">
          Manage your live stream and controls.
        </Text>

        {/* Live Stream Section */}
        <Box bg="white" shadow={2} borderRadius="lg" padding={moderateScale(16)}>
          <Heading fontSize={moderateScale(16)} color="primary.800" mb={moderateScale(8)}>
            Live Stream
          </Heading>
          <Box borderWidth={1} borderColor="primary.200" overflow="hidden" borderRadius="lg">
            <Video
              source={{ uri: 'http://3.95.181.205:5000/hls/output.m3u8' }}
              resizeMode="contain"
              useNativeControls
              shouldPlay
              style={{ width: '100%', height: moderateScale(200) }}
            />
          </Box>
        </Box>

        {/* Controls Section */}
        <Box bg="white" shadow={2} borderRadius="lg" padding={moderateScale(16)}>
          <Heading fontSize={moderateScale(16)} color="primary.800" mb={moderateScale(8)}>
            Controls
          </Heading>
          <HStack space={moderateScale(16)} justifyContent="center">
            <Button
              colorScheme="primary"
              padding={moderateScale(12)}
              fontSize={moderateScale(14)}
              onPress={() => sendCommand('play_lullaby')}
            >
              Play Lullaby
            </Button>
            <Button
              colorScheme="secondary"
              padding={moderateScale(12)}
              fontSize={moderateScale(14)}
              onPress={() => sendCommand('stop_lullaby')}
            >
              Stop Lullaby
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Dashboard;
