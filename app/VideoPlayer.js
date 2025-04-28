import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScrollView, Box, Heading, Button, HStack, useColorMode } from 'native-base';
import { Video } from 'expo-av';
import { verticalScale } from 'react-native-size-matters';

const BUCKET_NAME = 'videouploads2552';
const REGION      = 'us-east-1';

export default function VideoPlayer() {
  const { key }       = useLocalSearchParams();
  const router        = useRouter();
  const { colorMode } = useColorMode();
  const filename      = key.split('/').pop();
  const videoUrl      = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;

  return (
    <ScrollView
      flex={1}
      bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
      p={4}
      paddingTop={verticalScale(40)}
    >
      <HStack mb={4}>
        <Button onPress={() => router.replace({ pathname: '/Recordings' })}>
          Back
        </Button>
      </HStack>

      <Heading mb={4} color={colorMode === 'dark' ? 'white' : 'black'}>
        {filename}
      </Heading>

      <Box mb={4}>
        <Video
          source={{ uri: videoUrl }}
          useNativeControls
          resizeMode="contain"
          style={{
            width: '100%',
            aspectRatio: 16 / 9,
            borderRadius: 8,
            backgroundColor: '#000'
          }}
        />
      </Box>
    </ScrollView>
  );
}
