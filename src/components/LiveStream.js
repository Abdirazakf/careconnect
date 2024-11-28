import React from 'react';
import { Box, Text, VStack } from 'native-base';
import { Video } from 'expo-av';

const LiveStream = () => {
  return (
    <Box bg="white" shadow={2} borderRadius="lg" padding="4" mb="4">
      <VStack space="2">
        <Text fontSize="lg" fontWeight="bold" color="primary.800">
          Live Stream
        </Text>
        <Box borderWidth="1" borderColor="primary.200" overflow="hidden" borderRadius="lg">
          <Video
            source={{ uri: 'http://3.95.181.205:5000/hls/output.m3u8' }}
            resizeMode="contain"
            useNativeControls
            shouldPlay
            style={{ width: '100%', height: 200 }}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default LiveStream;
