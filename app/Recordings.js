// app/Recordings.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FlatList,
  Spinner,
  Text,
  Button,
  HStack,
  useColorMode
} from 'native-base';
import { Video } from 'expo-av';

const BUCKET_NAME = 'videouploads2552';
const REGION      = 'us-east-1'; 
const PREFIX      = '';
const LIST_URL    = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com?list-type=2${PREFIX?`&prefix=${PREFIX}`:''}`;

export default function Recordings() {
  const { colorMode } = useColorMode();
  const [videos,  setVideos]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState();

  useEffect(() => {
    let mounted = true;
    console.log('Fetching list from:', LIST_URL);
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
          url: `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`
        }));
        if (mounted) {
          setVideos(list);
          setError(undefined);
        }
      } catch (e) {
        console.error('Fetch error:', e);
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchList();
    const id = setInterval(fetchList, 2 * 60 * 1000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  if (loading) return <Spinner size="lg" />;
  if (error)   return <Text color="red.500">Error: {error}</Text>;

  return (
    <Box flex={1}
         bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
         paddingTop={10}
         p={4}>
      <Heading mb={4}
               color={colorMode === 'dark' ? 'white' : 'black'}>
        Video Now
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
          <Box mb={6}>
            <Video
              source={{ uri: item.url }}
              useNativeControls
              resizeMode="contain"
              style={{ width: '100%', height: 200, borderRadius: 8 }}
            />
          </Box>
        )}
      />
    </Box>
  );
}
