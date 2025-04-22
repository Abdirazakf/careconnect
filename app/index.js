import React from 'react';
import { Box, VStack, Heading, Text, HStack, Button, useColorMode } from 'native-base';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { WebView } from 'react-native-webview';

const Dashboard = () => {
  const { colorMode } = useColorMode();

  const sendCommand = async (command) => {
    try {
      await fetch('http://3.95.181.205:5000/controls', {
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
          alignItems="center"
        >
          <Heading
            fontSize={moderateScale(14)}
            color={colorMode === 'dark' ? 'white' : 'primary.800'}
            marginBottom={moderateScale(8)}
          >
            Live Stream
          </Heading>

          {/* Embed the stream via WebView */}
          <Box borderWidth={1} borderColor="gray.300" width="100%" height={moderateScale(200)}>
            <WebView
              source={{ uri: 'https://genuine-vital-pheasant.ngrok-free.app/cam_with_audio/' }}
              style={{ flex: 1 }}
              javaScriptEnabled
              domStorageEnabled
              mediaPlaybackRequiresUserAction={false}
              allowsInlineMediaPlayback
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
          <Heading
            fontSize={moderateScale(14)}
            color={colorMode === 'dark' ? 'white' : 'primary.800'}
            marginBottom={moderateScale(8)}
          >
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
});

export default Dashboard;
