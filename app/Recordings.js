// app/Recordings.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  Box,
  Heading,
  FlatList,
  Spinner,
  Text,
  Button,
  HStack,
  Pressable,
  useColorMode
} from 'native-base';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const BUCKET_NAME = 'videouploads2552';
const REGION      = 'us-east-1';
const PREFIX      = '';
const LIST_URL    = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com?list-type=2${PREFIX?`&prefix=${PREFIX}`:''}`;

export default function Recordings() {
  const { colorMode } = useColorMode();
  const router       = useRouter();
  const [videos,  setVideos]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState();

  useEffect(() => {
    let mounted = true;

    async function fetchList() {
      try {
        const xml = await fetch(LIST_URL).then(r => r.text());
        const keys = [];
        xml.replace(/<Key>(.*?)<\/Key>/g, (_, key) => {
          if (!key.endsWith('/')) keys.push(key);
          return '';
        });

        const list = keys.map(key => ({
          key,
          name: key.split('/').pop(),
          url:  `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`
        }));

        if (mounted) {
          setVideos(list);
          setError(undefined);
        }
      } catch (e) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchList();
    const intervalId = setInterval(fetchList, 2 * 60 * 1000);
    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  if (loading) return <Spinner size="lg" />;
  if (error)   return <Text color="red.500">Error: {error}</Text>;

  return (
    <Box
      flex={1}
      bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
      p={4}
      paddingTop={verticalScale(40)}
    >
      <Heading mb={4} color={colorMode === 'dark' ? 'white' : 'black'}>
        Recordings
      </Heading>

      <HStack mb={4} justifyContent="flex-end">
        <Button onPress={() => setVideos([])}>
          Clear All Videos
        </Button>
      </HStack>

      <FlatList
        data={videos}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({ pathname: '/VideoPlayer', params: { key: item.key } })
            }
          >
            <Box
              mb={3}
              p={4}
              bg={colorMode === 'dark' ? 'gray.700' : 'white'}
              borderRadius={8}
              shadow={1}
            >
              <Text
                color={colorMode === 'dark' ? 'white' : 'black'}
                fontSize="md"
              >
                {item.name}
              </Text>
            </Box>
          </Pressable>
        )}
      />
    </Box>
  );
}
