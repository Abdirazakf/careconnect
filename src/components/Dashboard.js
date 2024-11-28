import React from 'react';
import { Box, VStack, Heading, Text } from 'native-base';
import { Video } from 'expo-av';
import { useColorMode } from 'native-base';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

const Dashboard = () => {
  const { colorMode } = useColorMode();

  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'} padding={moderateScale(10)}>
      <VStack space={moderateScale(12)}>
        {/* Title Section */}
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
        <Box bg="white" shadow={2} borderRadius={moderateScale(8)} padding={moderateScale(10)}>
          <Heading fontSize={moderateScale(14)} color="primary.800" marginBottom={moderateScale(8)}>
            Live Stream
          </Heading>
          <Box borderWidth={1} borderColor="primary.200" overflow="hidden" borderRadius="lg">
            <Video
              source={{ uri: 'http://3.95.181.205:5000/hls/output.m3u8' }}
              resizeMode="contain"
              useNativeControls
              shouldPlay
              style={styles.video}
            />
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

const styles = ScaledSheet.create({
  video: {
    width: '100%', // Full width of the parent container
    height: '180@ms', // Dynamically scaled height
  },
});

export default Dashboard;
