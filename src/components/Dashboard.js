import React from 'react';
import { Box, VStack, Heading, Text, HStack, Button } from 'native-base';
import { Video } from 'expo-av';
import { useColorMode } from 'native-base';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

const Dashboard = () => {
  const { colorMode } = useColorMode();

  const sendCommand = async (command) => {
    try {
      await fetch('<YOUR IP HERE>', {
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
    <Box flex={1} bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'} padding={moderateScale(10)}>
      <VStack space={moderateScale(12)}>
        <Heading
          color={colorMode === 'dark' ? 'white' : 'black'}
          fontSize={moderateScale(18)}
          marginBottom={moderateScale(10)}
        >
          Dashboard
        </Heading>
        <Text fontSize={moderateScale(12)} color={colorMode === 'dark' ? 'gray.300' : 'gray.800'}>
          Manage your live stream and controls from here.
        </Text>

        {/* Live Stream Section */}
        <Box
          bg={colorMode === 'dark' ? 'gray.700' : 'white'}
          shadow={2}
          borderRadius={moderateScale(8)}
          padding={moderateScale(10)}
        >
          <Heading fontSize={moderateScale(14)} color={colorMode === 'dark' ? 'white' : 'primary.800'} marginBottom={moderateScale(8)}>
            Live Stream
          </Heading>
          <Box borderWidth={1} borderColor={colorMode === 'dark' ? 'gray.600' : 'primary.200'} overflow="hidden" borderRadius="lg">
            <Video
              source={{ uri: '<YOUR URL HERE>' }}
              resizeMode="contain"
              useNativeControls
              shouldPlay
              style={styles.video}
            />
          </Box>
        </Box>

        {/* Controls Section */}
        <Box
          bg={colorMode === 'dark' ? 'gray.700' : 'white'}
          shadow={2}
          borderRadius="lg"
          padding={moderateScale(16)}
        >
          <Heading fontSize={moderateScale(14)} color={colorMode === 'dark' ? 'white' : 'primary.800'} marginBottom={moderateScale(8)}>
            Controls
          </Heading>
          <HStack space={moderateScale(16)} justifyContent="center">
            <Button
              colorScheme={colorMode === 'dark' ? 'light' : 'primary'}
              padding={moderateScale(12)}
              fontSize={moderateScale(14)}
              onPress={() => sendCommand('play_lullaby')}
            >
              Play Lullaby
            </Button>
            <Button
              colorScheme={colorMode === 'dark' ? 'light' : 'secondary'}
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

const styles = ScaledSheet.create({
  video: {
    width: '100%',
    height: '180@ms',
  },
});

export default Dashboard;
